import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'; 
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ToasterService } from '@abp/ng.theme.shared';
import { VenteLinesDto } from '@proxy/vente-lines';
import { ClientDto } from '@proxy/clients';
import { ArticleDto } from '@proxy/articles';
import { VenteService,VenteDto } from '@proxy/ventes';
import { ClientService } from '@proxy/clients';
import { ArticleService } from '@proxy/articles';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PagedResultDto } from '@abp/ng.core';


@Component({
  selector: 'app-edit-vente',
  templateUrl: './edit-vente.component.html',
  styleUrls: ['./edit-vente.component.scss']
})
export class EditVenteComponent implements OnInit {
  ventes:any;
  vente:VenteDto;
  clients={ items: [], totalCount: 0 } as PagedResultDto<ClientDto>;
  articles={ items: [], totalCount: 0 } as PagedResultDto<ArticleDto>;
  
  isModalOpen=false;
  venteLineForm: FormGroup;
  venteForm: FormGroup;
  venteLinesData: any[]=[];
  isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private service: VenteService,
    private clientService: ClientService,
    private articleService: ArticleService,
    private router: Router,
    private route:ActivatedRoute,
    private datePipe: DatePipe,
    private toastr:ToasterService
  ) {
    this.loadForm();
    
  }

  loadForm(){
    this.venteForm = this.fb.group({
        venteCode: [{ value: '', disabled: true }, Validators.required],
        newDateVente: ['', Validators.required],
        newcClientId: ['', Validators.required],
        venteLines: this.fb.array([]) 
    }); 
  }
 


  // get vente
  LoadVente() {
    const codeVente = this.route.snapshot.paramMap.get('codeVente');
    this.service.getVenteDetailsByCodeVente(codeVente).subscribe((vente: VenteDto) => {
      this.vente = vente;
      console.log('vente', this.vente);
      this.venteForm.patchValue({
        venteCode: this.vente.id,
        newDateVente: this.vente.dateVente,
        newcClientId: this.vente.clientId
      });
  
      // Clear existing venteLines form array
      const venteLinesArray = this.venteForm.get('venteLines') as FormArray;
      venteLinesArray.clear();
  
      // Populate venteLines form array with values from vente.venteLines
      this.vente.venteLines.forEach(venteLine => {
        venteLinesArray.push(this.fb.group({
          id: [venteLine.id],
          articleId: [venteLine.articleId, Validators.required],

          qtySold: [venteLine.qtySold, Validators.required],
          salePrice:[venteLine.salePrice, Validators.required],
          totalPrice: [venteLine.totalPrice]
        }));
      });
  
      console.log('vente details', this.vente);
    }, (error) => {
      console.error('error fetching vente details', error);
    });
  }
  
  //  LoadVente(){
  //   const codeVente=this.route.snapshot.paramMap.get('codeVente');
  //   this.service.venteDetailsByCodeVente(codeVente).subscribe((vente:any)=>{
  //     this.vente=vente;
  //     this.venteForm.patchValue({
  //       venteCode:this.vente.id,
  //       newDateVente:this.vente.dateVente,
  //       newcClientId:this.vente.client.id,
  //       venteLines:this.vente.venteLines
  //     });

  //     console.log('vente details',this.vente);
  //   },
  //   (error)=>{
  //     console.error('error fetching vente details',error)
  //   });
  // }

  initializeForm() {
    this.venteLineForm = this.fb.group({
      articleId: [null, Validators.required],
      qtySold: [null, Validators.required],
      totalPrice: [0]
    });
  }

  createArticle() {
    this.isModalOpen = true;
  }
  // load clients
  loadClients(){
    this.clientService.getAll().subscribe((data)=>{
      this.clients=data;
      console.log('Clients',this.clients);
    });
  }

  //load articles
  loadArticles(){
    this.articleService.getAll().subscribe((data)=>{
      this.articles=data;
      console.log('articles :',this.articles);
     });
  }

  // load ventes
  loadVentes(){
    this.service.getAllVentes().subscribe((data)=>{
      this.ventes=data;
      console.log('sales: ',this.ventes);
    })
  }

  get venteLinesControls() {
    return (this.venteForm.get('venteLines') as FormArray).controls;
  }
  addVenteLine() {
    const venteLineFormGroup = this.fb.group({
      id: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'], // Initialize wid
      articleId: ['', Validators.required],
      qtySold: ['', Validators.required],
      salePrice: [0], 
       totalPrice: [0] 
    });
    venteLineFormGroup.get('articleId').valueChanges.subscribe(articleId => {
      // Fetch the selected article's price and set it as the salePrice
      const selectedArticle = this.articles.items.find(article => article.id === articleId);
      venteLineFormGroup.get('salePrice').setValue(selectedArticle ? selectedArticle.price : 0);
    });
    (this.venteForm.get('venteLines') as FormArray).push(venteLineFormGroup);
  }
 
  //edit vente
  editevente(){
    if (this.venteForm.valid) {
      const formValue = this.venteForm.value;
      const { venteCode, newDateVente, newcClientId, venteLines } = formValue;
  
     // Call the service method to update vente
      this.service.updateVente(
        this.vente.id,
        newDateVente,
        newcClientId,
        venteLines
      ).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastr.info(' : Successed update', 'Info');
        console.log('Vente updated successfully!', response);   
      },
        (error) => {
        this.toastr.error(' : Quantity Expired', 'Error');  
      });
    } 
  }
  //add vente line 
  // addVenteline(){
  //   if (this.venteLineForm.valid) {
  //     const newVenteLineDto: VenteLinesDto = this.venteLineForm.value;
  //     const venteCode: string = this.vente.id; 

  //     this.service.addVenteLineByVenteCodeAndNewVenteLineDto(venteCode, newVenteLineDto)
  //     .subscribe(response => {
  //       console.log('Vente line added successfully:', response);
  //       this.venteLineForm.reset();
  //       this.isModalOpen=false;
  //       this.toastr.success(' : Added successfully', 'Success');
  //       this.LoadVente();
  //     }, error => {
  //       this.toastr.error(' : Quantity Expired', 'Error'); 
  //     });
  //   } else {
  //     this.venteLineForm.markAllAsTouched();
  //   }
  // }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    this.loadClients();
    this.loadArticles();
    this.loadVentes();
    this.LoadVente();
    this.initializeForm();
    this.loadForm();
  }
 // delete venteline
  deleteVenteLine(codeVente:string,venteLineId:string){
    this.service.deleteVenteLineByCodeVenteAndVenteLineId(codeVente,venteLineId).subscribe(()=>this.LoadVente()); 
  }
}

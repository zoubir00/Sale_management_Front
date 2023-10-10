import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'; 
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ToasterService } from '@abp/ng.theme.shared';
import { VenteLinesDto } from '@proxy/vente-lines';
import { ClientDto } from '@proxy/clients';
import { ArticleDto } from '@proxy/articles';
import { ClientsService , ArticlesService ,VenteService} from '@proxy/controllers'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-vente',
  templateUrl: './edit-vente.component.html',
  styleUrls: ['./edit-vente.component.scss']
})
export class EditVenteComponent implements OnInit {
  ventes:any;
  vente:any;
  clients={} as ClientDto;
  articles={} as ArticleDto;
  
  isModalOpen=false;
  venteLineForm: FormGroup;
    venteForm: FormGroup;
    venteLinesData: any[]=[];

  constructor(
    private fb: FormBuilder,
    private service: VenteService,
    private clientService: ClientsService,
    private articleService: ArticlesService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    this.loadForm();
    
  }

  loadForm(){
    this.venteForm = this.fb.group({
        venteCode: ['', Validators.required],
        newDateVente: ['', Validators.required],
        newcClientId: ['', Validators.required],
        venteLines: this.fb.array([]) 
    }); 
  }
  setVenteLinesControls(venteLines: VenteLinesDto[]) {
    const controls = venteLines.map(line => this.fb.group({
      id: [line.id],
      articleId: [line.articleId, Validators.required],
      qtySold: [line.qtySold, Validators.required],
      totalPrice: [line.totalPrice] // Assuming you want to display total price but not edit it
    }));

    const formArray = this.fb.array(controls);
    this.venteForm.setControl('venteLines', formArray);
  }

   // get vente
   LoadVente(){
    const codeVente=this.route.snapshot.paramMap.get('codeVente');
    this.service.venteDetailsByCodeVente(codeVente).subscribe((vente:any)=>{
      this.vente=vente;
      this.venteForm.patchValue({
        venteCode:this.vente.id,
        newDateVente:this.vente.dateVente,
        newcClientId:this.vente.client.id,
        venteLines:this.vente.venteLines
      });
      console.log('vente details',this.vente);
    },
    (error)=>{
      console.error('error fetching vente details',error)
    });
  }

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
    this.clientService.getAllClients().subscribe((data)=>{
      this.clients=data;
      console.log('Clients',this.clients);
    });
  }

  //load articles
  loadArticles(){
    this.articleService.getAllArticle().subscribe((data)=>{
      this.articles=data;
      console.log('articles :',this.articles);
     });
  }

  // load ventes
  loadVentes(){
    this.service.getVentes().subscribe((data)=>{
      this.ventes=data;
      console.log('sales: ',this.ventes);
    })
  }

  get venteLinesControls() {
    return (this.venteForm.get('venteLines') as FormArray).controls;
  }
  //edit vente
  editevente(){
      if (this.venteForm.valid) {
        const formValue = this.venteForm.value;
        const { venteCode, newDateVente, newcClientId, venteLines } = formValue;
  
        // Call the service method to update vente
        this.service.updateVenteByVenteCodeAndNewDateVenteAndNewcClientIdAndVenteLines(
          this.vente.id,
          newDateVente,
          newcClientId,
          venteLines
        ).subscribe(
          (response) => {
            console.log('Vente updated successfully!', response);
            // Handle success, maybe redirect the user or show a success message
          },
          (error) => {
            console.error('Failed to update vente:', error);
            // Handle errors, show error messages to the user
      });
    } 
  }
  //add vente line 
  addVenteline(){
    if (this.venteLineForm.valid) {
      const newVenteLineDto: VenteLinesDto = this.venteLineForm.value;
      const venteCode: string = this.vente.id; // Set your vente code here or get it from your component state

      this.service.addVenteLineByVenteCodeAndNewVenteLineDto(venteCode, newVenteLineDto)
        .subscribe(response => {
          // Handle the response here, if needed
          console.log('Vente line added successfully:', response);
          // Reset the form after successful submission
          this.venteLineForm.reset();
          this.LoadVente();
        }, error => {
          // Handle errors here, if needed
          console.error('Error adding vente line:', error);
        });
    } else {
      // Mark form controls as touched to show validation errors
      this.venteLineForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {
    this.loadClients();
    this.loadArticles();
    this.loadVentes();
    this.LoadVente();
    this.initializeForm();
    this.loadForm();
  }
 // delete venteline
  deleteVenteLine(codeVente:string,venteLineId:number){
    this.service.deleteByCodeVenteAndVenteLineId(codeVente,venteLineId).subscribe(()=>this.LoadVente()); 
  }
}

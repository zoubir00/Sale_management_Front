import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'; 
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ToasterService } from '@abp/ng.theme.shared';
import { VenteLinesDto } from '@proxy/vente-lines';
import { ClientDto } from '@proxy/clients';
import { ArticleDto } from '@proxy/articles';
import { ClientService } from '@proxy/clients';
import { ArticleService } from '@proxy/articles';
import { Router } from '@angular/router';
import { VenteService } from '@proxy/ventes';
import { PagedResultDto } from '@abp/ng.core';


@Component({
  selector: 'app-create-vente',
  templateUrl: './create-vente.component.html',
  styleUrls: ['./create-vente.component.scss']
})
export class CreateVenteComponent implements OnInit {
  
  ventes:any;
  venteForm: FormGroup;
  clients={ items: [], totalCount: 0 } as PagedResultDto<ClientDto>;
  articles={ items: [], totalCount: 0 } as PagedResultDto<ArticleDto>;
  isLoading: boolean = true;
  isModalOpen=false;


  constructor(
    private formBuilder: FormBuilder,
    private service: VenteService,
    private clientService:ClientService,
    private articleService:ArticleService,
    private router: Router,
    private toastr:ToasterService) {
    
  }

  // Add line 
  createArticle() {
    this.isModalOpen = true;
  }
// get clients
  getClients(){
    this.clientService.getAll().subscribe((data)=>{
      this.clients=data;
      console.log('Clients', this.clients);
    })
  }
// get articles
getArticles(){
  this.articleService.getAll().subscribe((data)=>{
    this.articles=data;
    console.log('articles', this.articles);
  })
}
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    // get clients
    this.getClients();
    // get articles
    this.getArticles();
    this.venteForm = this.formBuilder.group({
      // venteCode: [],
      clientId: ['', Validators.required],
      dateVente: [''],
      venteLines: this.formBuilder.array([]) 
    });
  }
  onSubmit() {
    if (this.venteForm.valid) {
      const formData = this.venteForm.value;
      console.log('Form Data:', formData);
      if (formData.venteLines.length === 0) {
        console.log("Please add at least one vente line.");
        return;
      }
  
       this.service.createVenteByDateVenteAndClientIdAndVenteLines(
         formData.dateVente,
         formData.clientId,
         formData.venteLines
       ).subscribe(
         (response) => {
           console.log("Vente added successfully:", response);
           const codeVente = response.id;
           this.toastr.success(' : Operation successed', 'Success');
           this.isModalOpen=false;
           this.router.navigate(['/saledetails', codeVente]);
         },
         (error) => {
           this.toastr.error(' : Quantity Expired', 'Error');
         }
       );
    } else {
      //  where the form is invalid
      console.log('Form Valid:', this.venteForm.valid);
      console.log('Form Errors:', this.venteForm.errors);
      console.log('Form Controls:', this.venteForm.controls);
    }
  }
  get venteLinesControls() {
    return (this.venteForm.get('venteLines') as FormArray).controls;
  }
  addVenteLine() {
    const venteLines = this.venteForm.get('venteLines') as FormArray;
    venteLines.push(
      this.formBuilder.group({
        articleId: ['', Validators.required],
        qtySold: ['', Validators.required],
        
      })
    );
  }
  removeVenteLine(index: number) {
    const venteLines = this.venteForm.get('venteLines') as FormArray;
    venteLines.removeAt(index);
  }
 
}

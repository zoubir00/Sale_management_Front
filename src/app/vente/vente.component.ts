import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { VenteService } from '@proxy/controllers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // for form
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ClientsService , ArticlesService } from '@proxy/controllers'; 
import { ClientDto } from '@proxy/clients';
import { ArticleDto } from '@proxy/articles';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss'],
  providers: [ListService], 
})
export class VenteComponent implements OnInit {
  
  ventes:any;
  saleForm: FormGroup; 
  // venteForm: FormGroup;
  clients={} as ClientDto;
  articles={} as ArticleDto;
  isModalOpen=false;
  selectedClientId: number | null = null;
 // Create a FormGroup for article inputs
 articleForm: FormGroup;
 selectedArticles: { articleId: number, quantity: number }[] = [];
constructor(
  public readonly list:ListService,
  private venteService:VenteService,
  private fb:FormBuilder,
  private confirmation:ConfirmationService,
  private clientService:ClientsService,
  private articleService:ArticlesService,
  private toastr:ToasterService
  ) {}

  ngOnInit(): void {
    this.venteService.getVentes().subscribe((response) => {
      // Handle the response from the service, e.g., assign it to a component property
       this.ventes = response; // Adjust this based on your service response structure
      console.log('Ventes:', this.ventes);
    });
    this.clientService.getAllClients().subscribe((data)=>{
      this.clients=data;
      console.log('Clients',this.clients);
    });
    this.articleService.getAllArticle().subscribe((data)=>{
      this.articles=data;
      console.log('articles :',this.articles);
    });
    //
    this.saleForm = this.fb.group({
      clientId: [null, Validators.required],
    });

    // Create the articleForm with articleId and quantity fields
    this.articleForm = this.fb.group({
      articleId: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }
  // add new method
  OpenModal() {
    this.isModalOpen = true;
    this.buildForm();
  }
  
  buildForm(){
    this.saleForm = this.fb.group({
      clientId: [null, Validators.required],
     articleIds: [[], Validators.required],
     quantities: [[], Validators.required],
      })
    // this.venteForm = this.fb.group({
    //   clientId: [null, Validators.required],
    //   articleId: [null, Validators.required],
    //   quantity: [null, [Validators.required, Validators.min(1)]],
    // })
  }
// Select a client
selectClient(clientId: number) {
  this.selectedClientId = clientId;
}
addArticle() {
  if (this.articleForm.valid) {
    const formData = this.articleForm.value;
    this.selectedArticles.push({ articleId: formData.articleId, quantity: formData.quantity });
    // Clear the articleForm
    this.articleForm.reset();
  }
}
// Remove a selected article
  removeArticle(index: number) {
    this.selectedArticles.splice(index, 1);
  }
  CreateVente(){
    if (this.selectedClientId !== null && this.selectedArticles.length > 0) {
      const clientId = this.selectedClientId;
      const articleIds = this.selectedArticles.map(article => article.articleId);
      const quantities = this.selectedArticles.map(article => article.quantity);
    
    this.venteService.addVenteByInput({ clientId, articleIds, quantities }).subscribe((response)=>{
      this.isModalOpen=false;
      this.toastr.success(' Client Deleted successefully.', 'Success');
      
      console.log('Sales added:', response);
    },(error)=>{
      this.toastr.error('Cannot add vente','Error');
      console.error('Error adding sales:', error);
    });
    }
  }
  // delete vente
  
}



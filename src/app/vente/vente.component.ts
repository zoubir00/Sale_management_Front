import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { VenteService } from '@proxy/controllers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ClientsService , ArticlesService } from '@proxy/controllers'; 
import { ClientDto } from '@proxy/clients';
import { ArticleDto } from '@proxy/articles';
import { ToasterService } from '@abp/ng.theme.shared';
import { PageEvent } from '@angular/material/paginator'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss'],
  providers: [ListService], 
})
export class VenteComponent implements OnInit {
  
  ventes:any;
   // Pagination variables
   pageSize = 10; // set your desired page size
   pageIndex = 0;
   totalItems = 0;
   // load spinner
   loading = true;
  saleForm: FormGroup; 
  //clients
  clients={} as ClientDto;
  //articles
  articles={} as ArticleDto;
  //Open modal form
  isModalOpen=false;
  // get selected cliet Id
  selectedClientId: number | null = null;
 // Create a FormGroup for article inputs
 articleForm: FormGroup;
// selected article
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
    this.loading=true;
    // get vente history table
    timer(0) 
    .pipe(
      switchMap(()=>this.venteService.getVentes())
    )
    .subscribe((response) => {
       this.ventes = response; 
       this.totalItems=this.ventes.length;
       this.loading=false;
      console.log('Ventes:', this.ventes);
    });
    // call clients
    this.clientService.getAllClients().subscribe((data)=>{
      this.clients=data;
      console.log('Clients',this.clients);
    });
    // call articles
    this.articleService.getAllArticle().subscribe((data)=>{
      this.articles=data;
      console.log('articles :',this.articles);
    });
    //vente FormGroup declaration
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
  }
// Select a client
selectClient(clientId: number) {
  this.selectedClientId = clientId;
}
// add article to article's list
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

  // Valid the vente
  CreateVente(){
    if (this.selectedClientId !== null && this.selectedArticles.length > 0) {
      const clientId = this.selectedClientId;
      const articleIds = this.selectedArticles.map(article => article.articleId);
      const quantities = this.selectedArticles.map(article => article.quantity);
    
    this.venteService.addVenteByInput({ clientId, articleIds, quantities }).subscribe((response)=>{
      this.isModalOpen=false;
      this.ngOnInit();
      this.toastr.success(' Vente passed successfully. ', 'Success');
      console.log('Sales added:', response);
    },(error)=>{
      this.toastr.error('Cannot pass this sale','Error');
      console.error('Error adding sales:', error);
    });
    }
  }
// pagination
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}



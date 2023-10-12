import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { Router } from '@angular/router';

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
   // search
   searchForm:FormGroup;
   @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();
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
 isLoading: boolean = true;

constructor(
  public readonly list:ListService,
  private venteService:VenteService,
  private fb:FormBuilder,
  private confirmation:ConfirmationService,
  private clientService:ClientsService,
  private articleService:ArticlesService,
  private toastr:ToasterService,
  private router: Router
  ) {
    this.searchForm=this.fb.group({
      lname:[null, Validators.required]
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    this.loading=true;
     // get vente history table
     timer(1000) 
     .pipe(
       switchMap(()=>this.venteService.getVentes())
     )
     .subscribe((response) => {
        this.ventes = response; 
        this.totalItems=this.ventes.length;
        this.loading=false;
       console.log('Ventes:', this.ventes);
     });
    // // call clients
    // this.clientService.getAllClients().subscribe((data)=>{
    //   this.clients=data;
    //   console.log('Clients',this.clients);
    // });
    // // call articles
    // this.articleService.getAllArticle().subscribe((data)=>{
    //   this.articles=data;
    //   console.log('articles :',this.articles);
    // });
    // //vente FormGroup declaration
    // this.saleForm = this.fb.group({
    //   clientId: [null, Validators.required],
    // });

    // // Create the articleForm with articleId and quantity fields
    // this.articleForm = this.fb.group({
    //   articleId: [null, Validators.required],
    //   quantity: [null, Validators.required],
    // });
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
    
    // this.venteService.addVenteByInput({ clientId, articleIds, quantities }).subscribe((response)=>{
    //   this.isModalOpen=false;
    //   this.ngOnInit();
    //   this.toastr.success(' Vente passed successfully. ', ' Success ');
    //   console.log('Sales added:', response);
    // },(error)=>{
    //   this.toastr.error('One or all of These articles has expired from the stock',' Error ');
    //   console.error('Error adding sales:', error);
    // });
    }
  }
// pagination
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  onSubmit() {
    const lname = this.searchForm.value.lname;
    // Emit the search query to the parent component
    this.searchQuery.emit(lname);
    this.router.navigate(['/search', lname]);
  }
  onCreate(){
    this.router.navigate(['/createventes']);
  }

  // delete vente
  deleteVente(codeVente: string) {
    this.confirmation.warn('Are you sure you want to delete this sale', '::Are You Sure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.venteService.deleteByCodeVente(codeVente).subscribe(() => this.ngOnInit());
        this.toastr.warn(' : Sale Deleted successefully.', 'Warning');
      }
      },(error) => {
        // display an error message
        this.toastr.error(' :  we can not delete this articlee.', 'Error ');
        console.error('Error creating vente:', error);
    });
  } 
  
}



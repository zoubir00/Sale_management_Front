import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ClientDto } from '@proxy/clients';
import { ArticleDto } from '@proxy/articles';
import { GetVenteDto } from '@proxy/ventes';
import { VenteService } from '@proxy/ventes';
import { ToasterService } from '@abp/ng.theme.shared';
import { PageEvent } from '@angular/material/paginator'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { switchMap, timer } from 'rxjs';
import { Router } from '@angular/router';
import { AbpUserProfileService } from '@abp/ng.theme.lepton-x';


@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss'],
  providers: [ListService], 
})
export class VenteComponent implements OnInit {
  isAdmin: boolean;
  isSaleAdmin: boolean;
  isValid:boolean;
  constructor(
    public readonly list:ListService,
    private venteService:VenteService,
    private fb:FormBuilder,
    private confirmation:ConfirmationService,
    private toastr:ToasterService,
    private router: Router,
    private user:AbpUserProfileService

    ) {
      this.list.maxResultCount=50;
      this.searchForm=this.fb.group({
        lname:[null, Validators.required]
      })
    }
  ventes={ items: [], totalCount: 0 } as PagedResultDto<GetVenteDto>;
   // Pagination variables
   pageSize = 20; // set your desired page size
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



   ngOnInit(): void {
     setTimeout(() => {
       this.isLoading = false;
     }, 1000);
      this.getVentes();
     // // call clients
     this.user.currentUser$.subscribe(user=>{
      this.isAdmin=user.roles.includes('admin');
      this.isSaleAdmin=user.roles.includes('SaleAdmin');
     
  });
   }
   getVentes(){
// get vente history table
const venteStreamCreator = (query) => this.venteService.getAllVentes(query);
this.list.hookToQuery(venteStreamCreator).subscribe((response) => {
  console.log('Raw Data from Service:', response);
  this.ventes = response;
console.log('vente Data:', this.ventes);

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
      this.venteService.deleteVenteByVenteCode(codeVente).subscribe(() => this.ngOnInit());
      this.toastr.warn(' : Sale Deleted successefully.', 'Warning');
    }
    },(error) => {
      // display an error message
      this.toastr.error(' :  we can not delete this sale.', 'Error ');
      console.error('Error deleting sale:', error);
    });
  } 
}



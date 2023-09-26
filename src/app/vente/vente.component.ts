import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { VenteService } from '@proxy/controllers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // for form
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ClientsService , ArticlesService } from '@proxy/controllers'; 
import { ClientDto } from '@proxy/clients';
import { ArticleDto } from '@proxy/articles';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss'],
  providers: [ListService], 
})
export class VenteComponent implements OnInit {
  
  ventes:any;
  venteForm: FormGroup;
  clients={} as ClientDto;
  articles={} as ArticleDto;
  isModalOpen=false;
  

constructor(
  public readonly list:ListService,
  private venteService:VenteService,
  private fb:FormBuilder,
  private confirmation:ConfirmationService,
  private clientService:ClientsService,
  private articleService:ArticlesService
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
  }
  // add new method
  OpenModal() {
    this.isModalOpen = true;
    this.buildForm();
  }
  
  buildForm(){
    this.venteForm = this.fb.group({
      clientId: [null, Validators.required],
      articleId: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
    })
  }

  CreateVente(){
    if(this.venteForm.invalid){return;}
    const clientId=this.venteForm.get('clientId').value;
    const articleId=this.venteForm.get('articleId').value;
    const quantity=this.venteForm.get('quantity').value;

    // call create vente
    this.venteService.createVenteByClientIdAndArticleIdAndQuantity(clientId,articleId,quantity).subscribe((response)=>{
      console.log('Vente created successfully:', response);
      this.isModalOpen=false;
      this.venteForm.reset();
      this.ngOnInit();
    },(error) => {
      // Handle error, e.g., display an error message
      console.error('Error creating vente:', error);
    }
  );}

  // delete vente
  
}

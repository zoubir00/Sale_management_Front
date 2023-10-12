import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'; 
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ToasterService } from '@abp/ng.theme.shared';
import { VenteLinesDto } from '@proxy/vente-lines';
import { ClientDto } from '@proxy/clients';
import { ArticleDto } from '@proxy/articles';
import { ClientsService , ArticlesService ,VenteService} from '@proxy/controllers'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-vente',
  templateUrl: './create-vente.component.html',
  styleUrls: ['./create-vente.component.scss']
})
export class CreateVenteComponent implements OnInit {
  
  ventes:any;
  venteForm: FormGroup;
  clients={} as ClientDto;
  articles={} as ArticleDto;
  isLoading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
     private service: VenteService,
    private clientService: ClientsService,
    private articleService: ArticlesService,
    private router: Router,
    private toastr:ToasterService) {
    
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
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
    this.venteForm = this.formBuilder.group({
      venteCode: ['', Validators.required],
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
  
      this.service.addVenteByVenteCodeAndDateVenteAndClientIdAndVenteLines(
        formData.venteCode,
        formData.dateVente,
        formData.clientId,
        formData.venteLines
      ).subscribe(
        (response) => {
          console.log("Vente added successfully:", response);
          const codeVente = response.id;
          this.toastr.success(' : Operation successed', 'Success');
          this.router.navigate(['/saledetails', codeVente]);
          
          // navigate to ventes page
          // this.router.navigate(['/ventes']);
        },
        (error) => {
          console.error("Error occurred while adding vente:", error);
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
        qtySold: ['', Validators.required]
      })
    );
  }
  removeVenteLine(index: number) {
    const venteLines = this.venteForm.get('venteLines') as FormArray;
    venteLines.removeAt(index);
  }
  
}

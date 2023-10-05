import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'; 
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ToasterService } from '@abp/ng.theme.shared';
import { VenteLinesDto } from '@proxy/vente-lines';
import { ClientDto } from '@proxy/clients';
import { ArticleDto } from '@proxy/articles';
import { ClientsService , ArticlesService ,VenteService} from '@proxy/controllers'; 

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
  constructor(private formBuilder: FormBuilder, private service: VenteService,
    private clientService:ClientsService,
    private articleService:ArticlesService,) {
    
  }
  ngOnInit(): void {
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
      articleId: ['', Validators.required],
      dateVente: ['', Validators.required],
      venteLines: this.formBuilder.array([]) // You can initialize it as an empty array or with predefined values
    });
  }
  onSubmit() {
    if (this.venteForm.valid) {
      const formData = this.venteForm.value;
      
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
          // Handle success response here
          console.log("Vente added successfully:", response);
          // Optionally, reset the form after successful submission
          this.venteForm.reset();
        },
        (error) => {
          // Handle error response here
          console.error("Error occurred while adding vente:", error);
        }
      );
    } else {
      // Handle the case where the form is invalid
      console.log("Please fill out the form correctly.");
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
        // ... other properties
      })
    );
  }
  removeVenteLine(index: number) {
    const venteLines = this.venteForm.get('venteLines') as FormArray;
    venteLines.removeAt(index);
  }
  
}

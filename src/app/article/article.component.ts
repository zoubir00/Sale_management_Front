import { Component, OnInit } from '@angular/core';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticlesService, ClientsService } from '@proxy/controllers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleDto } from '@proxy/articles';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ToasterService } from '@abp/ng.theme.shared';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  // the article
  articles = { items: [], totalCount: 0 } as PagedResultDto<ArticleDto>;
  // search word
  searchString : string ='';
//selected article
  selectedArticle = {} as ArticleDto; // declare selectedBook

// article image : 
  //  selectedImage:string | null=null;
  form: FormGroup;
  isModalOpen=false;
 
  constructor(
  private articleservice:ArticlesService,
  private fb: FormBuilder,
  private confirmation: ConfirmationService,
  private toastr:ToasterService) {}
     
  ngOnInit(): void {
  this.articleservice.getAllArticle().subscribe(
    (data)=>{
      this.articles=data;
    },
    (error) => {
      console.error('Error fetching items:', error);
    }
    );
  }

  // search lethod
  // searcharticle(){
  //   if(this.searchString.trim()===''){
  //     this.ngOnInit();
  //   }else{
  //     this.articleservice.searchBySlibelle(this.searchString).subscribe((data)=>{
  //       this.searchResults=data;
  //     },(error)=>{
  //       console.error('Error searching articles:', error);
  //     });
  //   }
  // }
  // upload image
  //  onFileSelected(event: any) {
  //  const file = event.target.files[0];
  //    if (file) {
  //      const reader = new FileReader();
  //   reader.onload = (e) => {
  //        this.selectedImage = e.target.result as string;
  //      };
  //     reader.readAsDataURL(file);
  //   }
  //  }
  // Create article
  createarticle(){
    this.selectedArticle={} as ArticleDto;
    this.buildForm();
    this.isModalOpen=true;
  }
  editArticle(id:number){
    this.articleservice.getArticleByIdById(id).subscribe((articles)=>{
      this.selectedArticle=articles;
      this.buildForm();
      this.isModalOpen=true;
      console.log('Article selected',this.selectedArticle);
    })
  }
  buildForm() {
    this.form = this.fb.group({
      
      libelle: [ this.selectedArticle.libelle ||'', Validators.required],
      description: [this.selectedArticle.description || null, Validators.required],
      image: [this.selectedArticle.image || null, Validators.required],
      price: [this.selectedArticle.price || null, Validators.required],
      quantityinStock:[this.selectedArticle.quantityinStock || null,Validators.required]
    });
  }

  // Save Method
  save(){
    if(this.form.invalid){return ;}
    
    const request=this.selectedArticle.id ? this.articleservice.updateArticleByIdAndArticle(this.selectedArticle.id, this.form.value)
    : this.articleservice.createArticleByArticle(this.form.value);
    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.ngOnInit();
      this.toastr.success(' Operation successed.', 'Success');
    },(error) => {
      // Handle error, e.g., display an error message
      this.toastr.error(' Create Failed.', 'Error');
      console.error('Error creating vente:', error);
    });
    
  }
  // Add a delete method
delete(id: number) {
  this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
    if (status === Confirmation.Status.confirm) {
      this.articleservice.deleteArticleById(id).subscribe(() => this.ngOnInit());
      this.toastr.success(' Article Deleted successefully.', 'Success');
    }
    },(error) => {
      // Handle error, e.g., display an error message
      this.toastr.error(' we can not delete this articlee.', 'Error');
      console.error('Error creating vente:', error);
    });
    
  }
}

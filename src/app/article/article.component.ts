import { Component, OnInit } from '@angular/core';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleService } from '@proxy/articles'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleDto, CreateArticleDto,UpdateArticleDto } from '@proxy/articles';
import { PagedResultDto, ListService } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ToasterService } from '@abp/ng.theme.shared';
import { switchMap, timer } from 'rxjs';
import { ArticlesService } from '@proxy/controllers';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers:[ListService]
})
export class ArticleComponent implements OnInit {
  // the article
  articles = { items: [], totalCount: 0 } as PagedResultDto<ArticleDto>;
  selectedImage: string;
  isLoading: boolean = true;
  imageUrl: string;

  constructor(
    public readonly list:ListService,
   
  private articleservice:ArticlesService,
  private fb: FormBuilder,
  private confirmation: ConfirmationService,
  private toastr:ToasterService) {
    this.buildForm();
  }
  selectedArticle={} as ArticleDto;
  form: FormGroup;
  isModalOpen = false;
  selectedFile:File;
 
  ngOnInit(): void {
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    this.loadArticles();
  }

   loadArticles(): void {
    const articleStreamCreator = (query) => this.articleservice.getAllArticle(query);
    this.list.hookToQuery(articleStreamCreator).subscribe((response) => {
      console.log('Raw Data from Service:', response);
      this.articles = response;
    console.log('Client Data:', this.articles);
   
    });
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({  
      libelle: [ this.selectedArticle.libelle ||'', Validators.required],
      description: [this.selectedArticle.description || null, Validators.required],
      image: [this.selectedArticle.image ||null],
      price: [this.selectedArticle.price || null, Validators.required],
      quantityinStock:[this.selectedArticle.quantityinStock || null,Validators.required]
    });
  }

  createarticle(){
    this.selectedArticle={} as ArticleDto;
    this.buildForm();
    this.isModalOpen=true;
  }
 
  // Add editBook method
  editArticle(id:string){
    this.articleservice.getArticleByIdById(id).subscribe((article)=>{ 
       this.selectedArticle=article;
       this.buildForm();
       this.isModalOpen = true;
       console.log('Selected client',this.selectedArticle);
     });
   }
  // save(): void {
  //   if(this.form.invalid){return ;}
  //   // const articleData = this.form.value;
  //   // const imgFile: IFormFile = this.form.get('image').value;

  //   const request=this.selectedArticle.id ? this.articleservice.updateArticleByIdAndArticle(this.selectedArticle.id, this.form.value)
  //   : this.articleservice.createArticleByArticle(this.form.value);
  //   request.subscribe(() => {
  //     this.isModalOpen = false;
  //     this.form.reset();
  //     this.ngOnInit();
  //     this.toastr.success(' : Operation successed.', 'Success');
  //   },(error) => {
  //     // Handle error, e.g., display an error message
  //     this.toastr.error(' : Create Failed.', 'Error');
  //     console.error('Error creating vente:', error);
  //   });
  // }
  
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file: File = (inputElement.files as FileList)[0];
    if(file){
       const reader = new FileReader();
       reader.onload = () => {
       this.imageUrl = reader.result as string;
        this.form.patchValue({ image: file });
      };
      reader.readAsDataURL(file);
    }else{
      this.imageUrl='';
    }
   
    
  }
  save(){
    if(this.form.invalid){return ;}
    
    else{
      const CreateArticle: CreateArticleDto = {
        libelle: this.form.value.libelle,
        description: this.form.value.description,
        price: this.form.value.price,
        quantityinStock: this.form.value.quantityinStock
      };
      const Updatearticle: UpdateArticleDto = {
        libelle: this.form.value.libelle,
        description: this.form.value.description,
        price: this.form.value.price,
        quantityinStock: this.form.value.quantityinStock
      };

      const img: File = this.form.value.image;
      if(this.selectedArticle.id){
        
        this.articleservice.updateArticle(this.selectedArticle.id,Updatearticle,img).subscribe(()=>{
          this.isModalOpen=false;
          this.form.reset();
          this.list.get();
          this.toastr.success(' : Edit article operation successed', 'Success');
        });
      }
      else{
        this.articleservice.createArticle(CreateArticle,img).subscribe(()=>{
          this.isModalOpen=false;
          this.form.reset();
          this.list.get();
          this.toastr.success(' : Create article operation successed', 'Success');
        });
      }
    }
  }
  // onFormSubmit(): void {
  //   if (this.form.valid) {
  //     const article: ArticleDto = {
  //       libelle: this.form.value.libelle,
  //       description: this.form.value.description,
  //       price: this.form.value.price,
  //       quantityinStock: this.form.value.quantityinStock
  //     };

  //     const img: File = this.form.value.image;
  //     const request=this.selectedArticle.id ? this.articleservice.updateArticle(this.selectedArticle.id,article,img):
  //     this.articleservice.createArticle(article, img);
  //     request.subscribe(
  //       response => {
  //         this.isModalOpen = false;
  //     this.form.reset();
  //     this.ngOnInit();
  //     this.toastr.success(' : Operation successed.', 'Success');
  //       },
  //       error => {
  //         // Handle error, e.g., display an error message
  //     this.toastr.error(' : Create Failed.', 'Error');
  //     console.error('Error creating vente:', error);
  //       }
  //     );
  //   } else {
  //     // Handle form validation errors, if any
  //   }
  // }

  
  // Add a delete method
 delete(id: string) {
   this.confirmation.warn('::ArticleDeletionConfirmationMessage', '::Are You Sure').subscribe((status) => {
     if (status === Confirmation.Status.confirm) {
       this.articleservice.deleteArticleById(id).subscribe(() => this.ngOnInit());
      this.toastr.warn(' : Article Deleted successefully.', 'Warning');
     }
     },(error) => {
       // display an error message
       this.toastr.error(' : we can not delete this articlee.', 'Error');
       console.error('Error creating vente:', error);
     });
    
   }
}

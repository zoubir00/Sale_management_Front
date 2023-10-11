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
  selectedImage: string;
  
  constructor(
  private articleservice:ArticlesService,
  private fb: FormBuilder,
  private confirmation: ConfirmationService,
  private toastr:ToasterService) {

  }
  selectedArticle: ArticleDto = {} as ArticleDto;
  form: FormGroup;
  isModalOpen = false;
  selectedFile:File;
 
  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleservice.getAllArticle().subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  buildForm(): void {
    this.form = this.fb.group({  
      libelle: [ this.selectedArticle.libelle ||'', Validators.required],
      description: [this.selectedArticle.description || null, Validators.required],
      image: [this.selectedArticle.image || null, Validators.required],
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
   editArticle(id:number){
    this.articleservice.getArticleByIdById(id).subscribe((article)=>{ 
      this.selectedArticle=article;
      this.buildForm();
      this.isModalOpen = true;
      console.log('Selected client',this.selectedArticle);
    });
  }
  save(): void {
    if(this.form.invalid){return ;}
    
    const request=this.selectedArticle.id ? this.articleservice.updateArticleByIdAndArticle(this.selectedArticle.id, this.form.value)
    : this.articleservice.createArticleByArticle(this.form.value);
    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.ngOnInit();
      this.toastr.success(' : Operation successed.', 'Success');
    },(error) => {
      // Handle error, e.g., display an error message
      this.toastr.error(' : Create Failed.', 'Error');
      console.error('Error creating vente:', error);
    });
  }

  // onFileSelected(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement?.files && inputElement.files[0]) {
  //     const file = inputElement.files[0];
  //     this.form.patchValue({
  //       image: file
  //     });
  //   }
  // }
  // Add a delete method
delete(id: number) {
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

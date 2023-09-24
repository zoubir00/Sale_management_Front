import { Component, OnInit } from '@angular/core';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticlesService, ClientsService } from '@proxy/controllers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleDto } from '@proxy/articles';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles = { items: [], totalCount: 0 } as PagedResultDto<ArticleDto>;

  selectedArticle = {} as ArticleDto; // declare selectedBook

  form: FormGroup;
  isModalOpen=false;
 
  constructor(
  private articleservice:ArticlesService,
  private fb: FormBuilder,
  private confirmation: ConfirmationService ) {}
     
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

  // Create article
  createarticle(){
    this.selectedArticle={} as ArticleDto;
    this.buildForm();
    this.isModalOpen=true;
  }
  buildForm() {
    this.form = this.fb.group({
      
      libelle: ['', Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
      price: [null, Validators.required],
      quantityinStock:[null,Validators.required]
    });
  }

  // Save Method
  save(){
    if(this.form.invalid){return ;}
    this.articleservice.createArticleByArticle(this.form.value).subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.ngOnInit();
    });
    
  }
  // Add a delete method
delete(id: number) {
  this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
    if (status === Confirmation.Status.confirm) {
      this.articleservice.deleteArticleById(id).subscribe(() => this.ngOnInit());
    }
    });
  }
}

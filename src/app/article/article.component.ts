import { Component, OnInit } from '@angular/core';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticlesService, ClientsService } from '@proxy/controllers';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { ArticleDto } from '@proxy/articles';
import { PagedResultDto } from '@abp/ng.core';

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
 
  constructor(private articleservice:ArticlesService,
     private fb: FormBuilder,
     private confirmation: ConfirmationService ) 
     {}
     
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

  }

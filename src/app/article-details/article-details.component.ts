import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '@proxy/controllers';
import { ArticleDto } from '@proxy/articles';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit  {
  article: ArticleDto;
  /**
   *
   */
  constructor(private route: ActivatedRoute,
    private articleService: ArticlesService) {}
  ngOnInit(): void {
    const articleId = +this.route.snapshot.paramMap.get('id');

    // Call the service method to get the article details by ID
    this.articleService.getArticleByIdById(articleId).subscribe(
      (article: ArticleDto) => {
        this.article = article;
        console.log(' article details:', this.article);
      },
      (error) => {
        console.error('Error fetching article details:', error);
      }
    );
  }
  
    
}

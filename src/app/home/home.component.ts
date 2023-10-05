import { AuthService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ArticleDto } from '@proxy/articles';
import { ArticlesService } from '@proxy/controllers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }
  articles = { items: [], totalCount: 0 } as PagedResultDto<ArticleDto>;
  constructor(
    private authService: AuthService,
    private articleService:ArticlesService
    ) {}
  ngOnInit(): void {
    this.articleService.articlesSold().subscribe(
      (data)=>{
        this.articles=data;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
      );
  }
 

  login() {
    this.authService.navigateToLogin();
  }
}

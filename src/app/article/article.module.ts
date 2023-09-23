import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    ArticleRoutingModule,SharedModule
  ]
})
export class ArticleModule { }

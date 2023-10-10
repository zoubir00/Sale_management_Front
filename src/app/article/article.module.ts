import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    ArticleRoutingModule,SharedModule,CommonModule
  ]
})
export class ArticleModule { }

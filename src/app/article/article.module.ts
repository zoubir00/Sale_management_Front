import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    QRCodeModule,
    ArticleRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class ArticleModule { }

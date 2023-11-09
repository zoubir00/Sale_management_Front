import { NgModule,APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CustomLoginComponent } from './custom-login/custom-login.component';
import { AccountLayoutComponent } from './account-layout/account-layout.component'; 
import { ReplaceableComponentsService } from '@abp/ng.core';
import { eAccountComponents } from '@abp/ng.account';
function componentReplacer(replaceableComponent:ReplaceableComponentsService){
 return ()=>{
  replaceableComponent.add({
    key:eAccountComponents.AuthWrapper,
    component:AccountLayoutComponent
  });
  replaceableComponent.add({
    key:eAccountComponents.Login,
    component:CustomLoginComponent
  })
 } 
}

@NgModule({
  declarations: [
    CustomLoginComponent,
    AccountLayoutComponent
  ],
  imports: [
    CommonModule,SharedModule
  ],
  exports: [
    CustomLoginComponent,
    AccountLayoutComponent
  ]
})
export class AccountsModule { 
  static forRoot(): ModuleWithProviders<AccountsModule>{
    return {
      ngModule:AccountsModule,
      providers:[
        {
          provide:APP_INITIALIZER,
          useFactory:componentReplacer,
          multi:true,
          deps:[ReplaceableComponentsService]
        }
      ]
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ReplaceableComponentsService } from '@abp/ng.core';
import { eAccountComponents } from '@abp/ng.account';
import { eIdentityComponents } from '@abp/ng.identity';
import { CustomLoginComponent } from './account/custom-login/custom-login.component'; 
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { AccountLayoutComponent } from './account/account-layout/account-layout.component';
import { AccountsModule } from './account/accounts.module';

@Component({
  selector: 'app-root',
  template: `
    <!-- <abp-loader-bar></abp-loader-bar> -->
    <app-custom-layout></app-custom-layout>
    
  `,
})
export class AppComponent implements OnInit  {
 
  constructor(private replaceable:ReplaceableComponentsService) {}
  ngOnInit(): void {
     console.log('ngOnInit of YourModuleComponent is called');
    //  this.replaceable.add({
    //   key:eAccountComponents.Login,
    //   component:CustomLoginComponent,
    // });

    // this.replaceable.add({
    //   key:eAccountComponents.AuthWrapper,
    //   component:AccountsModule
    // })
  }

}

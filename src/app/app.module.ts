import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeLeptonXModule } from '@abp/ng.theme.lepton-x';
import { SideMenuLayoutModule } from '@abp/ng.theme.lepton-x/layouts';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { FeatureManagementModule } from '@abp/ng.feature-management';
import { AbpOAuthModule } from '@abp/ng.oauth';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccountModule } from '@abp/ng.account';
import { AccountsModule } from './account/accounts.module';


@NgModule({
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
  
    AppRoutingModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    AbpOAuthModule.forRoot(),
    ThemeSharedModule.forRoot(),
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    ThemeLeptonXModule.forRoot(),
    SideMenuLayoutModule.forRoot(),
    FeatureManagementModule.forRoot(),
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    MatPaginatorModule,
    BsDropdownModule.forRoot(),
     AccountModule,
    AccountsModule.forRoot(),
   
    
  ],
  declarations: [		
    	AppComponent, LogoComponent, CustomLayoutComponent
   ],
  providers: [APP_ROUTE_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}

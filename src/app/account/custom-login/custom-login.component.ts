import { Component } from '@angular/core';
import { AuthService, ConfigStateService } from '@abp/ng.core'; 
import { LoginParams } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { eAccountComponents } from '@abp/ng.account';


@Component({
  selector: 'app-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss']
})
export class CustomLoginComponent {
  userNameOrEmailAddress: string;
  password: string;
  loginParams: LoginParams = {
    username: '',
    password: '',
    rememberMe: false,
    redirectUrl:''
  };
  authWrapperKey = eAccountComponents.AuthWrapper;
  
  constructor(private accountService:AuthService,
    private toaster: ToasterService) {}
    onSubmit(): void {
      // Call the authentication service with loginParams
      this.accountService.login(this.loginParams)
        .subscribe(
          // Handle success
          response => {
            console.log('Login successful', response);
            // Redirect or perform other actions after successful login
          },
          // Handle errors
          error => {
            console.error('Login failed', error);
            // Handle error, show error message, etc.
          }
        );
    }
}

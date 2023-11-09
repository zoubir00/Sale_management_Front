import { Component, OnInit } from '@angular/core';
import { AuthService  } from '@abp/ng.core';
import { AbpUserProfileService } from '@abp/ng.theme.lepton-x';

@Component({
  selector: 'app-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss']
})
export class CustomLayoutComponent implements OnInit {
year:number=new Date().getFullYear();
userName:string;
isAdmin:boolean;
isSaleAdmin:boolean;


get hasLogedIn():boolean{
return this.auth.isAuthenticated;
};
constructor(private auth:AuthService,private user:AbpUserProfileService) {}
logOut(){
  this.auth.logout();
}
ngOnInit() {
  this.user.currentUser$.subscribe(user=>{
     this.userName=user.userName;
      this.isAdmin=user.roles.includes('admin');
      this.isSaleAdmin=user.roles.includes('SaleAdmin');
  });
  console.log(this.userName);  
}
}

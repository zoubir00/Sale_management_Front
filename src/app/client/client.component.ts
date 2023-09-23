import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDto } from '@proxy/clients';
import { ClientsService } from '@proxy/controllers';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {

  clients = { items: [], totalCount: 0 } as PagedResultDto<ClientDto>;

  selectedclient = {} as ClientDto; // declare selectedClient

  public form: FormGroup;
  isModalOpen=false;
 
  constructor(private clientservice:ClientsService,
     private fb: FormBuilder,
     private confirmation: ConfirmationService ) 
     {}

     createAuthor() {
      this.selectedclient = {} as ClientDto;
      this.buildForm();
      this.isModalOpen = true;
    }    
    //form validation
  buildForm() {
    this.form=this.fb.group({
      fName: [this.selectedclient.fName || '', Validators.required],
      lName: [this.selectedclient.lName || '', Validators.required],
      email: [this.selectedclient.email || '', Validators.required,Validators.email],
      phoneNumber: [this.selectedclient.phoneNumber || '', Validators.required,Validators.maxLength(10),Validators.pattern('[0-9]*')],
    })
  }
 // save data
 save() {
  if (this.form.invalid) {
  return;  
  }
  if (this.selectedclient.id) {
  this.clientservice.updateClientByIdAndClient(this.selectedclient.id, this.form.value).subscribe(() => {
    this.isModalOpen = false;
    this.form.reset();});
  }
  else
  { 
   this.clientservice.createClientByClient(this.form.value).subscribe(()=>{
     this.isModalOpen = false;
      this.form.reset();
     this.ngOnInit();
    });
  }
}
  ngOnInit(): void {
    this.clientservice.getAllClients().subscribe(
      (data)=>{
        this.clients=data;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
      );}
   
}

import { PagedResultDto, ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ClientDto } from '@proxy/clients';
import { ClientService } from '@proxy/clients';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers:[ListService]
})

export class ClientComponent implements OnInit {

  clients ={ items: [], totalCount: 0 } as PagedResultDto<ClientDto>;

  selectedClient={} as ClientDto;

  form:FormGroup;
  isModalOpen=false;
  isLoading: boolean = true;

  constructor(
    public readonly list:ListService,
    private clientservice:ClientService,
    private fb:FormBuilder,
    private confirmation:ConfirmationService,
    private toastr:ToasterService
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    const clientStreamCreator = (query) => this.clientservice.getAll(query);
    this.list.hookToQuery(clientStreamCreator).subscribe((response) => {
      console.log('Raw Data from Service:', response);
      this.clients = response;
    console.log('Client Data:', this.clients);
   
    });
  }
  // add new method
  createClient() {
    this.selectedClient={} as ClientDto;
    this.buildForm(); 
    this.isModalOpen = true;
  }
  // Add editBook method
   editClient(id:string){
     this.clientservice.getById(id).subscribe((client)=>{ 
       this.selectedClient=client;
       this.buildForm();
       this.isModalOpen = true;
       console.log('Selected client',this.selectedClient);
     });
   }

  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      fName: [this.selectedClient.fName || '', Validators.required],
      lName: [this.selectedClient.lName || null, Validators.required],
      email: [this.selectedClient.email || null,  [Validators.required, Validators.email]],
      phoneNumber: [this.selectedClient.phoneNumber || null, Validators.required],
    });
  }

  // Add Client
   save(){
     if(this.form.invalid){
       return ;
     }
     if(this.selectedClient.id){
       this.clientservice.update(this.selectedClient.id,this.form.value).subscribe(()=>{
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
        this.toastr.success(' : Edit client operation successed', 'Success');
      });
    }
     else{
      this.clientservice.create(this.form.value).subscribe(()=>{
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
        this.toastr.success(' : Add client operation successed', 'Success');
      })
    }
   }

  // Add a delete method
 delete(id: string) {
   this.confirmation.warn('::ClientDeletionConfirmationMessage', '::AreYouSure').subscribe((status) => {
     if (status === Confirmation.Status.confirm) {
       this.clientservice.delete(id).subscribe(() => this.list.get());
       this.toastr.warn(' : Client Deleted successefully.', 'Warning');
     }
   },(error) => {
     // display an error message
     this.toastr.error(' : we can not delete this Client.', 'Error');
    console.error('Error creating vente:', error);
   });
 }
}


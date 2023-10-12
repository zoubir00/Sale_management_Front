import { PagedResultDto, ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ClientDto } from '@proxy/clients';
import { ClientsService } from '@proxy/controllers';
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

  client ={ items: [], totalCount: 0 } as PagedResultDto<ClientDto>;

  selectClient={} as ClientDto;

  form:FormGroup;
  isModalOpen=false;
  isLoading: boolean = true;

  constructor(
    public readonly list:ListService,
    private clientservice:ClientsService, 
    private fb:FormBuilder,
    private confirmation:ConfirmationService,
    private toastr:ToasterService
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    const clientStreamCreator = (query) => this.clientservice.getAllClients(query);
    this.list.hookToQuery(clientStreamCreator).subscribe((response) => {
      console.log('Raw Data from Service:', response);
      this.client = response;
    console.log('Client Data:', this.client);
   
    });
  }
  // add new method
  createClient() {
    this.selectClient={} as ClientDto;
    this.buildForm(); 
    this.isModalOpen = true;
  }
  // Add editBook method
  editClient(id:number){
    this.clientservice.getClientByIdById(id).subscribe((client)=>{ 
      this.selectClient=client;
      this.buildForm();
      this.isModalOpen = true;
      console.log('Selected client',this.selectClient);
    });
  }

  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      fName: [this.selectClient.fName || '', Validators.required],
      lName: [this.selectClient.lName || null, Validators.required],
      email: [this.selectClient.email || null,  [Validators.required, Validators.email]],
      phoneNumber: [this.selectClient.phoneNumber || null, Validators.required],
    });
  }

  // Add Client
  save(){
    if(this.form.invalid){
      return ;
    }
    const request=this.selectClient.id ? this.clientservice.updateClientByIdAndNewClient(this.selectClient.id,this.form.value) 
    : this.clientservice.createClientByClient(this.form.value);
   request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
      this.toastr.success(' : Operation successed', 'Success');
    });
  }

  // Add a delete method
delete(id: number) {
  this.confirmation.warn('::ClientDeletionConfirmationMessage', '::AreYouSure').subscribe((status) => {
    if (status === Confirmation.Status.confirm) {
      this.clientservice.deleteClientById(id).subscribe(() => this.ngOnInit());
      this.toastr.warn(' : Client Deleted successefully.', 'Warning');
    }
  },(error) => {
    // display an error message
    this.toastr.error(' : we can not delete this Client.', 'Error');
    console.error('Error creating vente:', error);
  });
}
}


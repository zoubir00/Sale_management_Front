import { PagedResultDto, ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ClientDto } from '@proxy/clients';
import { ClientsService } from '@proxy/controllers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // for form
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers:[ListService]
})

export class ClientComponent implements OnInit {

  client ={ items: [], totalCount: 0 } as PagedResultDto<ClientDto>;

  selectClient={} as ClientDto;
  selectedId=0;
  form:FormGroup;
  isModalOpen=false;
 
  constructor(
    public readonly list:ListService,
    private clientservice:ClientsService, 
    private fb:FormBuilder,
    private confirmation:ConfirmationService
  ){}

  

  ngOnInit(): void {
    const clientStreamCreator = (query) => this.clientservice.getAllClients(query);

    this.list.hookToQuery(clientStreamCreator).subscribe((response) => {
      console.log('Raw Data from Service:', response);
      this.client = response;
      // Debugging: Log the data to the console
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
       this.selectedId=this.selectClient.id;
      console.log('Selected client',this.selectClient);
    });
  }

  // add buildForm method
   buildForm() {
    this.form = this.fb.group({
      fName: ['', Validators.required],
      lName: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }

  // Add Client
  save(){
    if(this.form.invalid){
      return ;
    }
    this.clientservice.createClientByClient(this.form.value).subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  // Add a delete method
delete(id: number) {
  this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
    if (status === Confirmation.Status.confirm) {
      this.clientservice.deleteClientById(id).subscribe(() => this.ngOnInit());
    }
  });
}
}


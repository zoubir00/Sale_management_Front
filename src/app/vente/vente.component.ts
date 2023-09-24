import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { VenteService } from '@proxy/controllers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // for form
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss'],
  providers: [ListService], 
})
export class VenteComponent implements OnInit {
  ventes:any;
constructor(
  public readonly list:ListService,
  private venteService:VenteService,
  private fb:FormBuilder,
  private confirmation:ConfirmationService
  ) {}

  ngOnInit(): void {
    this.venteService.getVentes().subscribe((response) => {
      // Handle the response from the service, e.g., assign it to a component property
       this.ventes = response; // Adjust this based on your service response structure
      console.log('Ventes:', this.ventes);
    });
  }

}

import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VenteService } from '@proxy/controllers';


@Component({
  selector: 'app-search-vente',
  templateUrl: './search-vente.component.html',
  styleUrls: ['./search-vente.component.scss']
})
export class SearchVenteComponent  {
  searchResults: any;
  searchName: string;
  /**
   *
   */
  constructor(private route: ActivatedRoute, private venteService: VenteService)
  {}
  
}

import { Component , OnInit } from '@angular/core';
import { VenteService } from '@proxy/controllers';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-vente-detail',
  templateUrl: './vente-detail.component.html',
  styleUrls: ['./vente-detail.component.scss']
})
export class VenteDetailComponent implements OnInit {

vente:any;
  
  constructor(
    private service:VenteService,
    private route:ActivatedRoute
    ) {}


  ngOnInit(): void {
    const codeVente=this.route.snapshot.paramMap.get('codeVente');

    this.service.venteDetailsByCodeVente(codeVente).subscribe((vente:any)=>{
      this.vente=vente;
      console.log('vente details',this.vente);
    },
    (error)=>{
      console.error('error fetching vente details',error)
    });
  }
  
}

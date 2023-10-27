import { Component , OnInit } from '@angular/core';
import { VenteDto, VenteService } from '@proxy/ventes';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-vente-detail',
  templateUrl: './vente-detail.component.html',
  styleUrls: ['./vente-detail.component.scss']
})
export class VenteDetailComponent implements OnInit {

vente:VenteDto;
isLoading: boolean = true;

  constructor(
    private service:VenteService,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
    this.isLoading = false;
      }, 1000);
      this.getVente();
  }
// get vente 
getVente(){
  const codeVente=this.route.snapshot.paramMap.get('codeVente');
  this.service.getVenteDetailsByCodeVente(codeVente).subscribe((vente:VenteDto)=>{
    this.vente=vente;
    console.log('vente details', this.vente);
  },(error)=>{
    console.error('error fetching vente details',error)
  });
}

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 1000);
  //   const codeVente=this.route.snapshot.paramMap.get('codeVente');

  //   this.service.venteDetailsByCodeVente(codeVente).subscribe((vente:any)=>{
  //     this.vente=vente;
  //     console.log('vente details',this.vente);
  //   },
  //   (error)=>{
  //     console.error('error fetching vente details',error)
  //   });
  // }
  //
  captureScreen() {
  let data = document.getElementById('contentToConvert');
  html2canvas(data as any).then(canvas => {
    var imgWidth = 210;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    const contentDataURL = canvas.toDataURL('image/png');
    let pdfData = new jsPDF('p', 'mm', 'a4');
    var position = 2;
    pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdfData.save(`MyPdf.pdf`);
  });
}
}

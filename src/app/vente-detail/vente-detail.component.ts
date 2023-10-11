import { Component , OnInit } from '@angular/core';
import { VenteService } from '@proxy/controllers';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';

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

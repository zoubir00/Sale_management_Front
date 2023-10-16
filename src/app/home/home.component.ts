import { AuthService, PagedResultDto } from '@abp/ng.core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArticleDto } from '@proxy/articles';
import { ArticlesService, VenteService } from '@proxy/controllers';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }
  isLoading: boolean = true;
  articles = { items: [], totalCount: 0 } as PagedResultDto<ArticleDto>;
  ventes:any;
  @ViewChild('salesChart') salesChart: ElementRef;

  constructor(
    private authService: AuthService,
    private articleService:ArticlesService,
    private venteService:VenteService
  ) {}


  // load method
  ngOnInit(): void {
    this.loadvente();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.articleService.getAllArticle().subscribe(
      (data)=>{
        this.articles=data;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }
 // get vente by id
  loadvente(){
    this.venteService.getVentes().subscribe((data)=>{
      this.ventes=data;
      const salesByMonth = this.groupSalesByMonth(data);
      this.createChart(salesByMonth);
      console.log(this.ventes);
    })
  }
  // monthly profits 
  groupSalesByMonth(ventes) {
    const salesByMonth = {};
    
    ventes.forEach(vente => {
      const date=new Date(vente.dateVente);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!salesByMonth[monthYear]) {
        salesByMonth[monthYear] = 0;
      }
      salesByMonth[monthYear] += vente.totalAmount;
    });
  
    return salesByMonth;
  }

  createChart(salesData:any) {
  const ctx = this.salesChart.nativeElement.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(salesData),
      datasets: [{
        label: 'Sales Profits in MAD',
        data: Object.values(salesData),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
    scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value : number) {
              return value + ' MAD';
            }
          }
          // other y-axis options here if needed
        }
      }
    }
  });
}
  
  login() {
    this.authService.navigateToLogin();
  }
}



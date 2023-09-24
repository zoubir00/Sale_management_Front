import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home', 
        layout: eLayoutType.application,
        order: 1,
       
      }, 
      {path: '/clients',
      name: '::Menu:Clients',
      layout: eLayoutType.application,
      order:2
    },
    {path: '/articles',
    name: '::Menu:Articles',
    layout: eLayoutType.application,
    order:3
    },
    {
      path:'/ventes',
      name:'::Menu:Ventes',
      layout:eLayoutType.application,
      order:4
    }
    
    ]);
  };
}

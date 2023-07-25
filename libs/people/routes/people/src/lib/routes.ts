import { Routes } from '@angular/router';
import {
  providePeopleFacadeService,
} from '@ng-star-wars/people/facades/people';

export const peopleRoutes: Routes = [
  {
    path: 'people',
    providers: [providePeopleFacadeService()],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search',
      },
      {
        path: 'search',
        loadComponent: async () =>
          (await import('@ng-star-wars/people/smart-components/search'))
            .SearchComponent,
      },
    ],
  },
];

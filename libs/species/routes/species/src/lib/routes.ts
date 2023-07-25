import { Routes } from '@angular/router';
import { provideSpeciesFacadeService } from '@ng-star-wars/species/facades/species';

export const speciesRoutes: Routes = [
  {
    path: 'species',
    providers: [provideSpeciesFacadeService()],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search',
      },
      {
        path: 'search',
        loadComponent: async () =>
          (await import('@ng-star-wars/species/smart-components/search'))
            .SearchComponent,
      },
    ],
  },
];

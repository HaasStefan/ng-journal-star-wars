import { Route } from '@angular/router';
import { peopleRoutes } from '@ng-star-wars/people/routes/people';
import { speciesRoutes } from '@ng-star-wars/species/routes/species';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'people',
  },
  ...peopleRoutes,
  ...speciesRoutes,
  {
    path: '**',
    redirectTo: 'people',
  },
];

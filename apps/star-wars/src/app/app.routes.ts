import { Route } from '@angular/router';
import { peopleRoutes } from '@ng-star-wars/people/routes/people';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'people',
    },
    ...peopleRoutes,
    {
        path: '**',
        redirectTo: 'people',
    }
];

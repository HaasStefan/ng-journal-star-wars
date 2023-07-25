import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrlToken } from '@ng-star-wars/shared/utils/base-url-token';
import { Person } from '@ng-star-wars/shared/models/person';
import { map } from 'rxjs';
import { delayIfDebug } from '@ng-star-wars/shared/utils/delay-if-debug';

@Injectable({
  providedIn: 'root',
})
export class PeopleDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BaseUrlToken);

  get() {
    return this.http
      .get<{
        results: Person[];
      }>(`${this.baseUrl}/people`)
      .pipe(
        delayIfDebug(500),
        map((res) => res.results)
      );
  }
}

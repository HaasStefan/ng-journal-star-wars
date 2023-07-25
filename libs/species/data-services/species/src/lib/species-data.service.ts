import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrlToken } from '@ng-star-wars/shared/utils/base-url-token';
import { Species } from '@ng-star-wars/shared/models/species';
import { map } from 'rxjs';
import { delayIfDebug } from '@ng-star-wars/shared/utils/delay-if-debug';

@Injectable({
  providedIn: 'root',
})
export class SpeciesDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BaseUrlToken);

  get() {
    return this.http
      .get<{
        results: Species[];
      }>(`${this.baseUrl}/species`)
      .pipe(
        delayIfDebug(500),
        map((res) => res.results)
      );
  }
}

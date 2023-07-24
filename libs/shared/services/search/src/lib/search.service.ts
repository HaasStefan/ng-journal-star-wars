import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly query = new Subject<string>();
  readonly query$ = this.query.asObservable();
}

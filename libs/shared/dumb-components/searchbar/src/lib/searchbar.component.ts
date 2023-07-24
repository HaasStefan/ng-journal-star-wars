import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { primengModules } from '@ng-star-wars/shared/utils/primeng';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchService } from '@ng-star-wars/shared/services/search';

@Component({
  selector: 'ng-star-wars-shared-searchbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...primengModules],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent implements OnInit {
  private readonly searchService = inject(SearchService);
  private readonly fb = inject(FormBuilder);
  readonly control = this.fb.nonNullable.control('');
  readonly search$ = this.control.valueChanges.pipe(
    debounceTime(800),
    distinctUntilChanged(),
    takeUntilDestroyed()
  );

  ngOnInit() {
    this.search$.subscribe((value) => this.searchService.query.next(value));
  }
}

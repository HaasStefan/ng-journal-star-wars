import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleFacadeService } from '@ng-star-wars/people/facades/people';
import { TableComponent } from '@ng-star-wars/people/dumb-components/table';
import { SearchService } from '@ng-star-wars/shared/services/search';
import { toSignal } from '@angular/core/rxjs-interop';
import { primengModules } from '@ng-star-wars/shared/utils/primeng';

@Component({
  selector: 'ng-star-wars-people-search',
  standalone: true,
  imports: [CommonModule, TableComponent, ...primengModules],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  private readonly facade = inject(PeopleFacadeService);
  private readonly searchService = inject(SearchService);

  readonly peopleSignal = this.facade.peopleSignal;
  readonly loadingSignal = this.facade.loadingSignal;
  readonly searchSignal = toSignal(this.searchService.query$, {
    initialValue: undefined
  });
  readonly filteredPeople = computed(() => {
    const search = this.searchSignal();
    if (!search) return this.peopleSignal();

    return this.peopleSignal().filter((person) =>
      person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });
}

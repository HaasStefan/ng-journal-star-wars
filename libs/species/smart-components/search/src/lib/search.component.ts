import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '@ng-star-wars/species/dumb-components/table';
import { SpeciesFacadeService } from '@ng-star-wars/species/facades/species';
import { primengModules } from '@ng-star-wars/shared/utils/primeng';
import { SearchService } from '@ng-star-wars/shared/services/search';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ng-star-wars-species-search',
  standalone: true,
  imports: [CommonModule, TableComponent, ...primengModules],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  private readonly facade = inject(SpeciesFacadeService);
  private readonly searchService = inject(SearchService);

  readonly speciesSignal = this.facade.speciesSignal;
  readonly loadingSignal = this.facade.loadingSignal;

  readonly searchSignal = toSignal(this.searchService.query$, {
    initialValue: undefined,
  });
  readonly filteredSpecies = computed(() => {
    const search = this.searchSignal();
    if (!search) return this.speciesSignal();

    return this.speciesSignal().filter((species) =>
      species.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });
}

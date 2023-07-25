import {
  computed,
  DestroyRef,
  EnvironmentProviders,
  inject,
  Injectable,
  makeEnvironmentProviders,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Species } from '@ng-star-wars/shared/models/species';
import { SpeciesDataService } from '@ng-star-wars/species/data-services/species';
import { tap } from 'rxjs';

interface State {
  species: Species[];
}

const initialState: Readonly<State> = {
  species: [],
};

export const provideSpeciesFacadeService = (): EnvironmentProviders =>
  makeEnvironmentProviders([SpeciesFacadeService]);

@Injectable()
export class SpeciesFacadeService {
  private readonly speciesDataService = inject(SpeciesDataService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly stateSignal = signal(initialState);
  readonly speciesSignal = computed(() => this.stateSignal().species);
  readonly loadingSignal = signal(false);

  constructor() {
    this.loadPeople().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  loadPeople() {
    this.loadingSignal.set(true);
    return this.speciesDataService.get().pipe(
      tap((species) => {
        this.stateSignal.update((state) => ({
          ...state,
          species,
        }));
      }),
      tap(() => this.loadingSignal.set(false))
    );
  }
}

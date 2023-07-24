import {
  computed,
  DestroyRef,
  EnvironmentProviders,
  inject,
  Injectable,
  makeEnvironmentProviders,
  signal,
} from '@angular/core';
import { PeopleDataService } from '@ng-star-wars/people/data-services/people';
import { Person } from '@ng-star-wars/shared/models/person';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface State {
  people: Person[];
}

const initialState: Readonly<State> = {
  people: [],
};

export const providePeopleFacadeService = (): EnvironmentProviders =>
  makeEnvironmentProviders([PeopleFacadeService]);

@Injectable()
export class PeopleFacadeService {
  private readonly peopleDataService = inject(PeopleDataService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly stateSignal = signal(initialState);
  public readonly peopleSignal = computed(() => this.stateSignal().people);
  readonly loadingSignal = signal(false);

  constructor() {
    this.loadPeople().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  loadPeople() {
    this.loadingSignal.set(true);
    return this.peopleDataService.get().pipe(
      tap((people) => {
        this.stateSignal.update((state) => ({
          ...state,
          people,
        }));
      }),
      tap(() => this.loadingSignal.set(false))
    );
  }
}

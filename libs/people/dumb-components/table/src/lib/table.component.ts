import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { primengModules } from '@ng-star-wars/shared/utils/primeng';
import { Person } from '@ng-star-wars/shared/models/person';

@Component({
  selector: 'ng-star-wars-people-table',
  standalone: true,
  imports: [CommonModule, ...primengModules],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly peopleSignal = signal<Person[]>([]);
  @Input({ required: true }) set people(value: Person[]) {
    this.peopleSignal.set(value);
  }
}

import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { primengModules } from '@ng-star-wars/shared/utils/primeng';
import { Species } from '@ng-star-wars/shared/models/species';

@Component({
  selector: 'ng-star-wars-species-table',
  standalone: true,
  imports: [CommonModule, ...primengModules],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly speciesSignal = signal<Species[]>([]);
  @Input({ required: true }) set species(value: Species[]) {
    this.speciesSignal.set(value);
  }
}

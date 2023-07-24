import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@ng-star-wars/shared/dumb-components/navbar';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'ng-star-wars-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}

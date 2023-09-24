import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
  <h1 class="text-center pt-2 pb-2">Deutscher Bierproduzent</h1>
  `,
  styles: [
    `
      * {
        background-color: #f0f0f0;
      }
    `,
  ],
})
export class NavbarComponent {

}

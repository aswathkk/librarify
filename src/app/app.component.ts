import { Component } from '@angular/core';

import { API_BASE_URL } from './globals';

@Component({
  selector: 'librarify-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url = API_BASE_URL;
}

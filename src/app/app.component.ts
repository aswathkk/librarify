import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { API_BASE_URL } from './globals';

@Component({
  selector: 'librarify-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuIcon = 'menu';
  showToolbar;
  constructor(router: Router, location: Location) {
    router.events.subscribe(val => {
      if(location.path() == '/login')
        this.showToolbar = false;
      else
        this.showToolbar = true;
    });
  }
}

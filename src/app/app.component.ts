import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'librarify-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('screen', [
      state('full', style({
        height: '100%'
      })),
      state('half', style({
        height: '50%'
      })),
      state('no', style({
        height: '0%'
      })),
      transition('* => *', animate('200ms cubic-bezier(1,0,0,1)'))
    ])
  ]
})
export class AppComponent {
  menuIcon = 'menu';
  showToolbar;
  screenState = 'half';

  constructor(private router: Router, private location: Location) { 
    router.events.subscribe(val => {
      if(location.path().indexOf('/login') === 0 || location.path().indexOf('/signup') === 0 || location.path().indexOf('/reset-password') === 0) {
        this.showToolbar = false;
        this.screenState = 'half';
      }
      else
        this.showToolbar = true;
    });
  }

  onActivate(e) {
    e.screen.subscribe(val => this.screenState = val);
  }
}

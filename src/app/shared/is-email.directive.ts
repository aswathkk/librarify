import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function emailValidator(control: FormControl) {
  let email = control.value; 
  const emailRegEx = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
  if(!emailRegEx.test(email))
    return {
      email: true
    };
  return null;
}

@Directive({
  selector: '[isEmail][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useValue: emailValidator,
    multi: true
  }]
})
export class IsEmailDirective { }
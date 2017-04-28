import { Directive, Input, OnChanges } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';

export function valueValidator(val) {
  return (control) => {
    if(control.value !== val)
      return {
        test: true
      };

    return null;
  };
}

@Directive({
  selector: '[testVal][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: TestValDirective,
    multi: true
  }]
})
export class TestValDirective implements Validator, OnChanges {
  
  @Input() testVal;
  validatorFn;

  ngOnChanges(changes) {
    let change = changes['testVal'];
    this.validatorFn = valueValidator(change.currentValue);
  }

  validate(control) {
    return this.validatorFn(control);
  }
}
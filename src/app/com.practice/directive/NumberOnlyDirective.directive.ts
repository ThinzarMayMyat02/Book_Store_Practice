import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[NumberOnlyDirective]',
  standalone: true,
  providers: [
    // {
    //   provide: NG_VALIDATO
    //   useExisting: NumberOnlyDirectiveDirective,
    //   multi: true,
    // },
  ],
})
// export class NumberOnlyDirectiveDirective implements Validator {
//   constructor() {}
//   validate(control: AbstractControl): ValidationErrors | null {
//     console.log('control', control);
//     const temp = new RegExp('[0-9]*').test(control.value)
//       ? { invalidNumber: { value: '' } }
//       : null;
//     console.log('temp', temp);
//     return temp;
//   }
// }

export class NumberOnlyDirectiveDirective  {

  constructor(private el: ElementRef) { } //
    @HostListener('input',['$event']) //event Listener for input event
    onInputChange(event: any) {
      const temp = this.el.nativeElement;
      temp.value = temp.value.replace(/[^0-9]*/g, '');
    }

    @HostListener('keypress', ['$event']) //event Listener for keypress event
    OnKeyPress(event: KeyboardEvent) {
      const pattern = /[0-9]/
      if(!pattern.test(event.key)){
        event.preventDefault();
      }
  }
}

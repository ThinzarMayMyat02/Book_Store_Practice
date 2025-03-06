import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NumberOnlyDirectiveDirective } from '../directive/NumberOnlyDirective.directive';
import { ThreeNumSplitWithDash } from '../pipe/ThreeNumSplitWithDash.pipe';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [FormsModule,NumberOnlyDirectiveDirective,ThreeNumSplitWithDash],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent {

  constructor() { }

  @ViewChild('authorForm') authorForm!:NgForm;

  onSubmit(): void {
    if(this.authorForm.valid){
      console.log('form value: ',this.authorForm);
    }else{
      console.log('form is invalid');
      console.log('form value: ',this.authorForm);
      this.touchFields();
    }
  }

  author: Author = {
    authorName: '',
    personName: '',
    email: '',
    phoneNo: '',
    address: '',
    genre: ''
  }

  touchFields(){
    Object.keys(this.authorForm.controls).forEach(k => {
      const control = this.authorForm.controls[k];
      console.log("Control", control);
      control.markAllAsTouched();
      control.updateValueAndValidity();
    });
  }
}

export interface Author {
  authorName: string;
  personName: string;
  email: string;
  phoneNo: string;

  address: string;
  genre: string;

}

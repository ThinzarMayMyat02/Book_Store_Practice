import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NumberOnlyDirectiveDirective } from '../directive/NumberOnlyDirective.directive';
import { ThreeNumSplitWithDash } from '../pipe/ThreeNumSplitWithDash.pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [FormsModule,NumberOnlyDirectiveDirective,ThreeNumSplitWithDash
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent implements OnInit{
  @ViewChild('authorForm') authorForm!:NgForm;
  authorService = inject(AuthorService);
  _route = inject(Router);
  _activateRoute = inject(ActivatedRoute);
  constructor() { }
  ngOnInit(): void {
    const id = this.getIdFromRoute();
    console.log("ID : ",id);
    const author = this.isEdit()? this.editAuthor(id) : this.author;
    this.author = author;
  }

  getIdFromRoute(){
    var id = +this._activateRoute.snapshot.params['id'];
    return id;
  }

  isEdit(){
    return this._route.url.includes('edit-author');
  }

  editAuthor(id:number) : any|Author{
    return this.authorService.findAuthor(id);
  }

  onSubmit(): void {
    if(this.authorForm.invalid){
      console.log('form is invalid');
      console.log('form value: ',this.authorForm);
      this.touchFields();
    }else{
      if(this.isEdit()){
        var id = this.getIdFromRoute();
        this.authorService.updateAuthor(id,this.authorForm.value);
        console.log("Update....");
      }else{
        const authorForm = this.authorForm.value;
        console.log("Form submitted value : ",authorForm);
        this.authorService.addAuthor(authorForm);
      }
      this._route.navigate(['/author-table']);
    }

  }

  touchFields(){
    Object.keys(this.authorForm.controls).forEach(k => {
      const control = this.authorForm.controls[k];
      control.markAllAsTouched();
      control.updateValueAndValidity();
    });
  }

  author: Author = {
    authorName: '',
    personName: '',
    email: '',
    phoneNo: '',
    address: '',
    genre: ''
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

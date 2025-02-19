import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-store',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-store.component.html',
  styleUrl: './book-store.component.scss'
})
export class BookStoreComponent implements OnInit{

form!:FormGroup;

private _formBuilder = inject(FormBuilder);

ngOnInit(): void {
  this.form = this.createBookForm(this.bookFactory());
  console.log("Form vlaue", this.form.value);
  this.isAvailableChanged();
}

isAvailableChanged() {
  this.form.get('isAvailable')?.valueChanges.subscribe((value:boolean) => {
    console.log('isAvailable value changed', value);
    if(value){
      this.form.addControl('quantity', this._formBuilder.control(null, [Validators.required,Validators.min(1)]));
      this.form.removeControl('restockDate');
    }else{
      this.form.addControl('restockDate', this._formBuilder.control(null, [Validators.required]));
      this.form.removeControl('quantity');
    }
  })
}

checkControlContains(controlName: string){
  return this.form.contains(controlName);
}

createBookForm(book: Book):FormGroup{
  return this._formBuilder.group({
    title: [book.title,[Validators.required]],
    author: [book.author,[Validators.required]],
    desc: [book.desc,[Validators.required]],
    price: [book.price,[Validators.required]],
    category: [book.category,[Validators.required]],
    isAvailable: [book.isAvailable,[Validators.required]]
  });
}

onSubmit(): void {
  if(this.form.invalid){
    this.touchAllFields();
  }

  console.log("Submit Form value", this.form.value);
}

touchAllFields(){
  Object.keys(this.form.controls).forEach(k => {
    const control = this.form.get(k);
    control?.markAsTouched();
    control?.updateValueAndValidity();
  })
  }

  bookFactory(): Book {
    return {
      title: null,
      author: null,
      desc: null,
      price: null,
      category: null,
      isAvailable: null,
      quantity: null,
      restockDate: null
    }
  }
}

export const books: Book[] = [
  {
    title: 'Midnight Sun ',
    author: 'Stephenie Meyer',
    desc: 'The biggest factor that made this perspective entertaining at least was Edwards’ ability to read minds. ',
    price: 25,
    category: 'Fiction',
    isAvailable: false,
    quantity: null,
    restockDate: new Date('2021-10-10')
  }
];

export interface Book {
  title: string | null;
  author: string | null;
  desc: string | null;
  price: number | null;
  category: string | null;
  isAvailable: boolean|null;
  quantity: number|null;
  restockDate?: Date|null;
}

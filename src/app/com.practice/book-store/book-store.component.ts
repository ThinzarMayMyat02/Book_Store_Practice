import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BookStoreServiceService } from '../service/book-store-service.service';
import { Author, AuthorComponent } from '../author/author.component';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-book-store',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-store.component.html',
  styleUrl: './book-store.component.scss',
})
export class BookStoreComponent implements OnInit {
  form!: FormGroup;

  private _formBuilder = inject(FormBuilder);
  private bookSubject = new BehaviorSubject<Book[]>([]);

  private _route = inject(Router);

  authorList !: Author[];
  books$ = this.bookSubject.asObservable();

  bookService = inject(BookStoreServiceService);

  authorService = inject(AuthorService);

  _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // this.form = this.createBookForm(this.bookFactory());
    // const isEdit = this.isEdit();
    // console.log(" Is Edit : ",isEdit);
    // const id = this.getIdFromRoute();
    // console.log("Id from Route ",id);

    // console.log('Form vlaue', this.form.value);
    // this.isAvailableChanged();


    const id = this.getIdFromRoute();
    const book = this.isEdit() ? this.editBook(id): this.bookFactory();
    this.form = this.createBookForm(book);

    this.authorService.getAllAuthor().subscribe(author =>{
      this.authorList = author;
    })

    this.isAvailableChanged();
    this.changeQuantityControl(book.isAvailable,book.quantity,book.restockDate);
  // this.form.get('author')?.valueChanges.subscribe(console.log);
  }

  isAvailableChanged() {
    this.form.get('isAvailable')?.valueChanges.subscribe((value: boolean) => {
      console.log('isAvailable value changed', value);
      this.changeQuantityControl(value);
    });
  }

  changeQuantityControl(isAvailable:boolean|null,
                        quantity:number|null = null,  // default
                        restockDate:Date|null = null){
    if(isAvailable != null){
      if (isAvailable) {
        this.form.addControl(
          'quantity',
          this._formBuilder.control(quantity, [
            Validators.required,
            Validators.min(1),
          ])
        );
        this.form.removeControl('restockDate');
      } else {
        this.form.addControl(
          'restockDate',
          this._formBuilder.control(restockDate, [Validators.required])
        );
        this.form.removeControl('quantity');
      }
    }
  }
  checkControlContains(controlName: string) {
    return this.form.contains(controlName);
  }

  createBookForm(book: Book): FormGroup {
    return this._formBuilder.group({
      title: [book.title, [Validators.required]],
      author: [book.author, [Validators.required]],
      desc: [book.desc, [Validators.required]],
      price: [book.price, [Validators.required]],
      category: [book.category, [Validators.required]],
      isAvailable: [book.isAvailable, [Validators.required]],
    });
  }

  touchAllFields() {
    Object.keys(this.form.controls).forEach((k) => {
      const control = this.form.get(k);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
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
      restockDate: null,
    };
  }

  editBook(id: Number) : Book{
    return this.bookService.findBook(id);
  }

  getIdFromRoute(): number {
    var id = +this._activatedRoute.snapshot.params['id'];
    console.log("Id : "+id);
    return id;
  }

  isEdit(){
    return this._route.url.includes('edit-book');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.touchAllFields();
    } else {
      if(this.isEdit()){
        var id = this.getIdFromRoute();
        this.bookService.updateBook(id,this.form.value);
        console.log("Updated book....");
      }else{
      const bookConst = this.form.value;
      // var author = this.form.get('author')?.value;
      // bookConst.author = author.authorName + ", "+author.personName;
      this.bookService.addBook(bookConst);
      }
    this._route.navigate(['/book-table']);
    }

    console.log('Submit Form value', this.form.value);
  }
}

export const books: Book[] = [
  {
    title: 'Midnight Sun ',
    author: null,
    desc: 'The biggest factor that made this perspective entertaining at least was Edwards’ ability to read minds. ',
    price: 25,
    category: 'Fiction',
    isAvailable: false,
    quantity: null,
    restockDate: new Date('2021-10-10'),
  },
];

export interface Book {
  title: string | null;
  author: Author | null;
  desc: string | null;
  price: number | null;
  category: string | null;
  isAvailable: boolean | null;
  quantity: number | null;
  restockDate?: Date | null;
}

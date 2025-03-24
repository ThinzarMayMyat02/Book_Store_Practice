import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book-store/book-store.component';
import { BookStoreServiceService } from '../service/book-store-service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllBooks } from '../store/selector/book.selector';
import { deleteBookAction } from '../store/action/book.action';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.scss'
})
export class BookTableComponent implements OnInit{

  bookService = inject(BookStoreServiceService);
  private _router = inject(Router);

  books$!: Observable<Book[]>;
  bookList!:Book[];

  store = inject(Store);

  ngOnInit(): void {
    this.books$ = this.store.select(selectAllBooks);
    this.getAllBook();
    console.log("bookList: ",this.bookList);

  }

  getAllBook(){
    // this.bookService.getAllBook().subscribe(books =>{
    //   this.bookList = books;
    // });
    this.books$ .subscribe(books =>{
      this.bookList = books;
    })
  }

  removeBook(id:Number){
    this.bookService.removeBook(id);
  }

  editBook(id:Number){
    var book = this.bookService.findBook(id);
    this._router.navigate(['/edit-book/',id]);
    console.log("edit book: ",book);

  }

  updateBook(id:number,book:Book){
    this.bookService.updateBook(id,book);
  }


  getLabelForBook(book:Book){
    return book.author?.authorName + ", "+ book.author?.personName;
    }

    deleteBook(id: number) {
      this.store.dispatch(deleteBookAction({ id }));
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book-store/book-store.component';
import { BookStoreServiceService } from '../service/book-store-service.service';
import { Router } from '@angular/router';

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

  bookList!:Book[];

  ngOnInit(): void {
    this.getAllBook();
  }

  getAllBook(){
    this.bookService.getAllBook().subscribe(books =>{
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

  updateBook(id:Number,book:Book){
    this.bookService.updateBook(id,book);
  }

}

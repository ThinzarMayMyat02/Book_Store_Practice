import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../book-store/book-store.component';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { createBookAction, deleteBookAction, selectBookAction, updateBookAction } from '../store/action/book.action';

@Injectable({
  providedIn: 'root',
})
export class BookStoreServiceService {
  constructor() {}
  private bookList = new BehaviorSubject<Book[]>([]);

   bookstore = inject(Store<AppState>);
  addBookold(book: Book) {
    const currentBookList = this.bookList.getValue();
    this.bookList.next([...currentBookList, book]);
  }

  removeBook(id: Number) {
    const currentBookList = this.bookList.getValue();
    for (let index = 0; index < currentBookList.length; index++) {
      if (index == id) {
        currentBookList.splice(index);
      }
    }
    this.bookList.next(currentBookList);
  }

  findBook(id: Number): any | Book {
    const currentBookList = this.bookList.getValue();
    for (let index = 0; index < currentBookList.length; index++) {
      if (index == id) {
        var book = currentBookList[index];
        return book;
      }
    }
  }

  updateBookold(id: Number, book: Book) {
    const currentBookList = this.bookList
      .getValue()
      .map((bk: Book, index: number) => {
        if (id == index) {
          bk = book;
        }
        return bk;
      });
    console.log('update bookList: ', currentBookList);
    this.bookList.next(currentBookList);
  }

  getAllBook() {
    return this.bookList;
  }

  addBook(book: Book) {
    this.bookstore.dispatch(createBookAction({ book }));
  }

  updateBook(id: number, book: Book) {
    this.bookstore.dispatch(updateBookAction({ id, book }));
  }

  deleteBook(id: number) {
    this.bookstore.dispatch(deleteBookAction({ id }));
  }

  selectBook(id: number) {
    this.bookstore.dispatch(selectBookAction({ id }));
  }
}

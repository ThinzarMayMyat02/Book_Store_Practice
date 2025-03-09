import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../book-store/book-store.component';

@Injectable({
  providedIn: 'root',
})
export class BookStoreServiceService {
  constructor() {}
  private bookList = new BehaviorSubject<Book[]>([]);

  addBook(book: Book) {
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

  updateBook(id: Number, book: Book) {
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
}

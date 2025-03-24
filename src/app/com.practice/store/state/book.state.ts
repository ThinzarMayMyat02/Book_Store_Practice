import { Book } from "../../book-store/book-store.component";

export interface BookState {
  books: Book[],
  selectedBook: Book | null;
}

import { createReducer, on } from "@ngrx/store";
import { BookState } from "../state/book.state";
import { createBookAction, deleteBookAction, updateBookAction} from "../action/book.action";
import { Book } from "../../book-store/book-store.component";

export const bookInitialState:BookState = {
  books: [
    // {
    //   title: 'Midnight Sun ',
    //   author: null,
    //   desc: 'The biggest factor that made this perspective entertaining at least was Edwards’ ability to read minds. ',
    //   price: 25,
    //   category: 'Fiction',
    //   isAvailable: false,
    //   quantity: null,
    //   restockDate: new Date('2021-10-10'),
    // }
  ],
  selectedBook: null,
};

export const bookReducer = createReducer(
  bookInitialState,
  on(createBookAction, (state,{book}) => {
    return {
      ...state,
      books: [...state.books,book]
    };
  }),
  // on(updateBooksAction, (state,{book}) => {
  //   return {
  //     ...state,
  //     books: state.books.map((b:Book) => b.id === book.id ? book : b)
  //   };
  // }),
  on(updateBookAction, (state, { id, book }) => ({
    ...state,
    books: state.books.map((b, i) =>(i === id ?  book : b))
  })),
  on(deleteBookAction, (state, { id }) => ({
    ...state,
    books: state.books.filter((_, i) => i !== id),
  }))
);

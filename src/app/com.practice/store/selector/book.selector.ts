import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from '../state/book.state';

export const bookStateSelector = createFeatureSelector<BookState>('bookState'); //app.state.ts

export const selectBooks = createSelector(
  bookStateSelector,
  (state) => state.books
);
export const selectAllBooks = createSelector(
  bookStateSelector,
  (state) => state.books
);

export const selectBookById = (id: number) => createSelector(
  bookStateSelector,
  (state) => state.books.find((book,i) => i === id)
);

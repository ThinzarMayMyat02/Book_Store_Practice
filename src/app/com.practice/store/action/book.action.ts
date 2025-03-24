import { createAction, props } from "@ngrx/store";
import { Book } from "../../book-store/book-store.component";

export const createBookAction = createAction('[Book-store Component] Create Book',
  props<{book:Book}>()
);

export const updateBookAction = createAction('[Book-store Component] Update Book',
  props<{id:number, book: Book }>()
);
export const deleteBookAction = createAction('[Book-store Component] Delete Book',
  props<{ id: number }>());


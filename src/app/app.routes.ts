import { RouterModule, Routes } from '@angular/router';
import { BookStoreComponent } from './com.practice/book-store/book-store.component';
import { AuthorComponent } from './com.practice/author/author.component';
import { BookTableComponent } from './com.practice/book-table/book-table.component';
import { AuthorTableComponent } from './com.practice/author-table/author-table.component';

export const routes: Routes = [
  {path: 'author', component: AuthorComponent},
  {path: 'book', component: BookStoreComponent},
  {path: 'book-table', component: BookTableComponent},
  {path: 'edit-book/:id', component:BookStoreComponent},
  {path: 'author-table', component:AuthorTableComponent},
  {path: 'edit-author/:id', component:AuthorComponent},
  {path: '', redirectTo: 'author', pathMatch: 'full'}
];

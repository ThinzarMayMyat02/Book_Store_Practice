import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookStoreComponent } from "./com.practice/book-store/book-store.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'book_store_angular_learning';
}

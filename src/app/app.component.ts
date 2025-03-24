import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookStoreComponent } from "./com.practice/book-store/book-store.component";
import { Store } from '@ngrx/store';
import { AppState } from './com.practice/store/state/app.state';
import { selectCount } from './com.practice/store/selector/count.selector';
import { count } from 'rxjs';
import { decreaseCount, increaseCount } from './com.practice/store/action/count.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'book_store_angular_learning';

  counter = inject(Store<AppState>);

  showCountValue!:number;

  ngOnInit(): void {
   this.counter.select(selectCount).subscribe((count)=>{  // select count from store
      this.showCountValue = count;
   });
  }

  increase(){
    this.counter.dispatch(increaseCount());
  }

  decrease(){
    this.counter.dispatch(decreaseCount())
  }
}

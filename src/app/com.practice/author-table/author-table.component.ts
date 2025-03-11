import { Component, inject, OnInit } from '@angular/core';
import { Author } from '../author/author.component';
import { AuthorService } from '../service/author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-table',
  standalone: true,
  imports: [],
  templateUrl: './author-table.component.html',
  styleUrl: './author-table.component.scss'
})
export class AuthorTableComponent implements OnInit{

  _route = inject(Router);
  authorList!:Author[];
  authorService = inject(AuthorService);

  ngOnInit(): void {
    this.getAllAuthor();
  }

  getAllAuthor(){
    return this.authorService.getAllAuthor().subscribe(authors => {
      this.authorList = authors;
    });
  }

  editAuthor(id:number){
    this._route.navigate(['edit-author',id]);
  }

  removeAuthor(id:number){
    this.authorService.removeAuthor(id);
  }
}

import { Injectable } from '@angular/core';
import { Author } from '../author/author.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor() { }

  private authorList = new BehaviorSubject<Author[]>([]);

  getAllAuthor(){
    return this.authorList;
  }

  addAuthor(author:Author){
    const currentAuthors = this.authorList.getValue();
    this.authorList.next([...currentAuthors,author]);
  }

  findAuthor(id:number) : any | Author{
    const currentAuthors = this.authorList.getValue();
    for (let c = 0; c < currentAuthors.length; c++) {
      if(c == id){
        var author = currentAuthors[c];
        return author;
      }
    }
  }

  updateAuthor(id:number,author:Author){
    const currAuthors = this.authorList.getValue()
    .map((a:Author, index:number) => {
      if(index == id){
        a = author
      }
      return a;
    });
    console.log("update user: ",this.authorList.getValue());
    this.authorList.next(currAuthors);
  }

  removeAuthor(id:number){
    const currAuthors = this.authorList.getValue();
    for (let index = 0; index < currAuthors.length; index++) {
      if(id == index){
        currAuthors.splice(index);
      }
    }
    this.authorList.next(currAuthors);
  }
}

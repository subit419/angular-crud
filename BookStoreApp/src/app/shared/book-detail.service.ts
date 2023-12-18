import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import { BookDetail } from './book-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BookDetailService {

  url: string = environment.apiBaseUrl + '/Books'
  list: BookDetail[] = []
  constructor(private http: HttpClient) { }


  refreshList(){
    this.http.get(this.url)
    .subscribe({
      next: res => {
        this.list = res as BookDetail[]
      },
      error: err => { console.log(err)}

    })
  }
}
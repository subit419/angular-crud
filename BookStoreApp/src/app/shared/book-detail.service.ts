import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import { BookDetail } from './book-detail.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookDetailService {

  url: string = environment.apiBaseUrl + '/Books'
  list: BookDetail[] = []
  formData: BookDetail = new BookDetail()
  formSubmitted: boolean = false;

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

  postBookDetail(formData: BookDetail) {
    return this.http.post(this.url, formData)
  }

  putBookDetail(formData: BookDetail) {
    return this.http.put(this.url + '/' + this.formData.id , formData)
  }

  deleteBookDetail(id:string) {
    return this.http.delete(this.url + '/' + id);
  } 

  resetFormData(){
    this.formData.id = '';
    this.formData.author = '';
    this.formData.price = 0;
    this.formData.bookName = '';
    this.formData.category = '';
  }
}

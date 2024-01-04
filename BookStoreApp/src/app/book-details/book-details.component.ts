import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailFormComponent } from './book-detail-form/book-detail-form.component';
import { BookDetailService } from '../shared/book-detail.service';
import { BookDetail } from '../shared/book-detail.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  standalone: true,
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  imports: [BookDetailFormComponent, CommonModule],

})
export class BookDetailsComponent implements OnInit {
  constructor(public service: BookDetailService, private toastr: ToastrService) {}
  
  @ViewChild(BookDetailFormComponent) child:BookDetailFormComponent | undefined;
  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: BookDetail) {
    // Using object.assign to create a copy of this object in order
    // to avoid the List Item updating as you change the text fields
    // in the form.
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
        this.service.deleteBookDetail(id).subscribe({
            next: (res) => {
              this.service.refreshList();
              this.toastr.error('Deleted Successfully', 'Book Detail Register');
              this.service.formSubmitted = false;
              this.child?.formGroup.reset();
              this.service.formData.id = '';
              
            },
            error: (err) => {
              console.log(err);
            },
          });
    }
  }
}

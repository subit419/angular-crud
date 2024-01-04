import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { BookDetailService } from '../../shared/book-detail.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookDetail } from '../../shared/book-detail.model';
import { Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-book-detail-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-detail-form.component.html',
  styleUrl: './book-detail-form.component.css',
})
export class BookDetailFormComponent implements OnChanges {
  constructor(public service: BookDetailService, public formBuilder: FormBuilder, private toastr: ToastrService) {
    this.formGroup = formBuilder.group({
      bookName: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
      id: ['']
    });
  }
  public formGroup: FormGroup;
  @Input() updateFormData: BookDetail = new BookDetail();

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    for (const propName in changes) {
      const change = changes[propName];
      if (change.firstChange == false) {
        this.formGroup.setValue({
          bookName: change.currentValue.bookName,
          price: change.currentValue.price,
          category: change.currentValue.category,
          author: change.currentValue.author,
          id: change.currentValue.id
        });
      }
    }
  }
  submit() {
    this.service.formSubmitted = true;
    if (this.formGroup.valid) {
      if (!this.service.formData.id) {
        this.insertRecord();
      } else {
        this.updateRecord();
      }
    }
  }

  insertRecord() {
    this.service.postBookDetail(this.formGroup.value).subscribe({
      next: (res) => {
        this.service.refreshList();
        this.formGroup.reset();
        this.toastr.success('Book Added Successfully', 'Book Detail Register');
        this.service.formSubmitted = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateRecord() {
    this.service.putBookDetail(this.formGroup.value).subscribe({
      next: (res) => {
        this.service.refreshList();
        this.formGroup.reset();
        this.toastr.info('Book Updated Successfully', 'Book Detail Register');
        this.service.formSubmitted = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

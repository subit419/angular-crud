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
          author: change.currentValue.author
        });
      }
    }
    // this.formGroup.setValue({
    //   bookName: changes['bookName'],
    //   price: changes['price'],
    //   category: changes['category'],
    //   author: changes['author'],
    // });
  }

  submit() {
    this.service.formSubmitted = true;
    if (this.formGroup.valid) {
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
  }
}

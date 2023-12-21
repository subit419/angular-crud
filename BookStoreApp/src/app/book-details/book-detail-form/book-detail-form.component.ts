import { Component } from '@angular/core';
import { BookDetailService } from '../../shared/book-detail.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-book-detail-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-detail-form.component.html',
  styleUrl: './book-detail-form.component.css',
})
export class BookDetailFormComponent {
  constructor(
    public service: BookDetailService,
    public formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      bookName: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
    });
  }
  public formGroup: FormGroup;

  submit() {
    window.console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      this.service.postBookDetail(this.formGroup.value).subscribe({
        next: (res) => {
          this.service.refreshList();
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}

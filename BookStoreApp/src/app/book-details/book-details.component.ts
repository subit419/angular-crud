import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailFormComponent } from "./book-detail-form/book-detail-form.component";
import { BookDetailService } from '../shared/book-detail.service';



@Component({
    selector: 'app-book-details',
    standalone: true,
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css',
    imports: [BookDetailFormComponent, CommonModule]
})
export class BookDetailsComponent implements OnInit {
    constructor (public service: BookDetailService) {

    }
    ngOnInit(): void {
        this.service.refreshList();
    }

}

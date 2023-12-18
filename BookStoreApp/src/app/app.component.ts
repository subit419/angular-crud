import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BookDetailsComponent } from "./book-details/book-details.component";
import { HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, BookDetailsComponent, HttpClientModule]
})
export class AppComponent {
  title = 'BookStoreApp';
}

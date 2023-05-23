import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../includes/header/header.component';

@Component({
  selector: 'app-publisher',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent {

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../includes/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

}

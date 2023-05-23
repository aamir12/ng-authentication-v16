import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { UserData } from 'src/app/core/model/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private authService:AuthService) {}

  userData$!: Observable<UserData | null>;

  ngOnInit(): void {
    this.setUpListner();
  }

  setUpListner() {
    this.userData$ = this.authService.getUserInfo();
  }

  onLogout() {
    this.authService.logout();
  }
}

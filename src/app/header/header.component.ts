import { Component, OnInit } from '@angular/core';
import { AuthGuardGuard } from '../auth-guard.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: any;
  showLogout: any;
  constructor(public authService: AuthGuardGuard) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('UserName');
  }
  logout() {
    this.authService.logout();
  }
  toggleLogout() {
    this.showLogout = !this.showLogout;
  }
}

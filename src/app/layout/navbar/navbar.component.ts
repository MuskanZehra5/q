// src/app/navbar/navbar.component.ts (or header.component.ts)
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-navbar', // or 'app-header'
  templateUrl: './navbar.component.html', // or './header.component.html'
  styleUrls: ['./navbar.component.css'] // or './header.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error during signout:', error);
    });
  }
}

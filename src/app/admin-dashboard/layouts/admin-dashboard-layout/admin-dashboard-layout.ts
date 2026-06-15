import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard-layout.html',
  styleUrls: ['./admin-dashboard-layout.css'],
})
export class AdminDashboardLayout {
  authService =inject(AuthService);


  user =computed(()=>{
    return this.authService.user();
  })

  onLogout(){
    this.authService.logout();
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'front-nabvar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-nabvar.html',
  styleUrls: ['./front-nabvar.css'],
})
export class FrontNabvar {
  authService= inject(AuthService);
  private router = inject(Router);

  goToLogin(e?: Event){
    if(e) e.preventDefault();
    this.router.navigateByUrl('/auth/login').catch(()=>{ window.location.href = '/auth/login'; });
  }
}

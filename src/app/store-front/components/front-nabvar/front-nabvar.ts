import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'front-nabvar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-nabvar.html',
  styleUrl: './front-nabvar.css',
})
export class FrontNabvar {
  authService= inject(AuthService);
}

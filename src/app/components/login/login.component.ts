import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService
      .signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(() =>
        swal.fire({
          icon: 'success',
          text: 'You have successfully logged in.',
          timer: 2000, // Ascunde automat alerta după 3 secunde
          timerProgressBar: true, // Bară de progres pentru durata alertei
          toast: true, // Afișează alerta ca și toast
          position: 'top-start', // Poziția alertei
          showConfirmButton: false, // Nu afișa butonul de confirmare
        })
      )
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) =>
        swal.fire({
          icon: 'error',
          text: error,
          timer: 2000, // Ascunde automat alerta după 3 secunde
          timerProgressBar: true, // Bară de progres pentru durata alertei
          toast: true, // Afișează alerta ca și toast
          position: 'top-start', // Poziția alertei
          showConfirmButton: false, // Nu afișa butonul de confirmare
        })
      );
  }
}

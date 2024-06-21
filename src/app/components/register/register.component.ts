import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerData = {
    email: '',
    password: '',
  };

  constructor(public authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService
      .registerUserWithEmailAndPassword(
        this.registerData.email,
        this.registerData.password
      )
      .then(() =>
        swal.fire({
          icon: 'success',
          text: 'You have successfully registered.',
          timer: 2000, // Ascunde automat alerta după 3 secunde
          timerProgressBar: true, // Bară de progres pentru durata alertei
          toast: true, // Afișează alerta ca și toast
          position: 'top-start', // Poziția alertei
          showConfirmButton: false, // Nu afișa butonul de confirmare
        })
      )
      .then(() => this.router.navigate(['/login']))
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

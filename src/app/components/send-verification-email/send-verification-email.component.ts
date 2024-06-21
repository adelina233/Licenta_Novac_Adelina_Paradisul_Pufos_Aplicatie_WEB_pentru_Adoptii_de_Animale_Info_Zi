import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send-verification-email',
  templateUrl: './send-verification-email.component.html',
  styleUrls: ['./send-verification-email.component.css'],
})
export class SendVerificationEmailComponent implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        user.reload().then(() => {
          if (user.emailVerified) {
            console.log('Email is verified');
            this.router.navigate(['/login']); // Redirect to login page
          } else {
            console.log('Email is not verified');
          }
        });
      }
    });
  }
}

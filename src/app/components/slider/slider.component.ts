import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Adopt, AdoptService } from 'src/app/services/adopt.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  adoptList: Adopt[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private adoptService: AdoptService
  ) {}
  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        user.reload().then(() => {
          console.log(user);

          if (user.emailVerified) {
            console.log('Email is verified');
          } else {
            console.log('Email is not verified');
          }
        });
      }
    });
    this.adoptService.getAdoptLimitedList(4).subscribe((data) => {
      this.adoptList = data;
    });
  }
}

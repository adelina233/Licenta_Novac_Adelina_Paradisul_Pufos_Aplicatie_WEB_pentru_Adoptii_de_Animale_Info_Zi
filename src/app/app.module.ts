import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { TeamComponent } from './components/team/team.component';
import { AdoptComponent } from './components/adopt/adopt.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AdoptSingleComponent } from './components/adopt-single/adopt-single.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { SendVerificationEmailComponent } from './components/send-verification-email/send-verification-email.component';
import { DonationDialogComponent } from './components/donation-dialog/donation-dialog.component';
import { DonationPageComponent } from './components/donation-page/donation-page.component';
import { AddAdoptComponent } from './components/add-adopt/add-adopt.component';
import { EditAdoptComponent } from './components/edit-adopt/edit-adopt.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { ChatdialogComponent } from './components/chatdialog/chatdialog.component';
import { AdoptFormDialogComponent } from './components/adopt-form-dialog/adopt-form-dialog.component';
import { AdminAdoptionRequestsComponent } from './components/admin-adoption-requests/admin-adoption-requests.component';
import { AdminAdoptPendingComponent } from './components/admin-adopt-pending/admin-adopt-pending.component';
import { AnimalDetailsDialogComponent } from './components/animal-details-dialog/animal-details-dialog.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewsDialogComponent } from './components/reviews-dialog/reviews-dialog.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    ServicesComponent,
    AboutComponent,
    GalleryComponent,
    TeamComponent,
    AdoptComponent,
    ContactComponent,
    FooterComponent,
    AdoptSingleComponent,
    LoginComponent,
    RegisterComponent,
    SendVerificationEmailComponent,
    DonationDialogComponent,
    DonationPageComponent,
    AddAdoptComponent,
    EditAdoptComponent,
    FavoriteListComponent,
    ChatdialogComponent,
    AdoptFormDialogComponent,
    AdminAdoptionRequestsComponent,
    AdminAdoptPendingComponent,
    AnimalDetailsDialogComponent,
    ReviewsComponent,
    ReviewsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    provideStorage(() => getStorage()),
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

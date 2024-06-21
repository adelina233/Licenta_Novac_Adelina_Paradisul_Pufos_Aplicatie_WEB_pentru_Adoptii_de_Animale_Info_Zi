import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './components/slider/slider.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { TeamComponent } from './components/team/team.component';
import { AdoptComponent } from './components/adopt/adopt.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdoptSingleComponent } from './components/adopt-single/adopt-single.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SendVerificationEmailComponent } from './components/send-verification-email/send-verification-email.component';
import { DonationPageComponent } from './components/donation-page/donation-page.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { AdminAdoptionRequestsComponent } from './components/admin-adoption-requests/admin-adoption-requests.component';
import { AdminGuard } from './services/guards/admin.guard';
import { AdminAdoptPendingComponent } from './components/admin-adopt-pending/admin-adopt-pending.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SliderComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'team', component: TeamComponent },
  { path: 'adopt', component: AdoptComponent },
  { path: 'adopt-single/:id', component: AdoptSingleComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'verify-email-address', component: SendVerificationEmailComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoriteListComponent },
  {
    path: 'admin/adoption-requests',
    component: AdminAdoptionRequestsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/adoption-pending',
    component: AdminAdoptPendingComponent,
    canActivate: [AdminGuard],
  },

  { path: 'donation', component: DonationPageComponent },
  { path: 'contact', component: ContactComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

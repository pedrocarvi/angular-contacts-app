import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddEditContactComponent } from './components/add-edit-contact/add-edit-contact.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts-list', pathMatch: 'full' },
  { path: 'contacts-list', component: HomeComponent },
  { path: 'favorites', component: FavoritesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-contact', component: AddEditContactComponent },
  { path: 'edit-contact/:id', component: AddEditContactComponent },
  { path: 'contact-details/:id', component: ContactDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth/auth.guard';
import { PersonalComponent } from './personal/personal.component';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { PersonalUpdateComponent } from './personal-update/personal-update.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { MovieComponent } from './movie/movie.component';
const routes: Routes = [
  {
    path:'', component: HomeComponent , canActivate: [AuthGuard] 
  },
  {
    path:'register' , component:RegisterComponent
  },
  {
    path:'login' , component:LoginComponent
  },
  {
    path:'edit/:_id' , component:EditUserComponent , canActivate : [AuthGuard]
  },
  {
    path:'logout', component: LogoutComponent , canActivate : [AuthGuard]
  },
  {
    path:'about/me/:_id', component:PersonalComponent , canActivate : [AuthGuard]
  },
  {
    path:'personal/details', component:PersonalFormComponent ,canActivate : [AuthGuard]
  },
  {
    path:'personal/details-edit/:_id', component: PersonalUpdateComponent , canActivate: [AuthGuard]
  },
  {
    path:'about', component: AboutComponent , canActivate: [AuthGuard] 
  },
  {
   path:'forgot-password' ,component: ForgotPassComponent 
  },
  {
    path:'resetpassword/:_id/:token', component: ResetPassComponent
  },
  {
    path:'book-details', component: MovieComponent , canActivate: [AuthGuard]
  },
  {
    path:'language-chart', component: MovieComponent , canActivate: [AuthGuard]
  },
  {
    path:'**' , component:NotFoundComponent , canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

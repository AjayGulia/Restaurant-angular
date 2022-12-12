import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { RestaurantHomeComponent } from './restaurant-home/restaurant-home.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path : 'login', component: LoginComponent},
  {path : 'signup', component: SignupComponent},
  {path : 'restaurant',canActivate:[AuthGuard], component: RestaurantHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { MainComponent } from './Components/main/main.component';
import { GamesLibraryComponent } from './Components/games-library/games-library.component';
import { CartComponent } from './Components/cart/cart.component';
import { PlaceOrderComponent } from './Components/place-order/place-order.component';
import { GameComponent } from './Components/game/game.component';
import { PlatformComponent } from './Components/platform/platform.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AboutComponent } from './Components/about/about.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/forgotPassword', component: ForgotPasswordComponent},
  {path: 'login/resetPassword', component: ResetPasswordComponent},
  {path: 'main', component: MainComponent},
  {path: 'main/gamesLibrary', component: GamesLibraryComponent},
  {path: 'main/gamesLibrary/:id', component: GameComponent},  
  {path: 'main/cart', component: CartComponent},
  {path: 'main/placeOrder', component: PlaceOrderComponent},
  {path: 'main/platform/:id', component: PlatformComponent},
  {path: 'main/orders', component: OrdersComponent},
  {path: 'main/contactUs', component: ContactComponent},
  {path: 'main/about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

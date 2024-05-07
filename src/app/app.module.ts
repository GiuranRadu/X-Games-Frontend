import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './Components/cart/cart.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { GamesLibraryComponent } from './Components/games-library/games-library.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { PlaceOrderComponent } from './Components/place-order/place-order.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http'; //! manually injected
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './Pipes/filter.pipe';
import { SearchBarComponent } from './Partials/search-bar/search-bar.component';
import { ConfirmationDialogComponent } from './Partials/confirmation-dialog/confirmation-dialog.component';
import { GameComponent } from './Components/game/game.component';
import { EmptyCartComponent } from './Partials/empty-cart/empty-cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './Components/footer/footer.component';
import { StarRatingComponent } from './Partials/star-rating/star-rating.component';
import { PlatformComponent } from './Components/platform/platform.component'; //! manually injected,
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrdersComponent } from './Components/orders/orders.component';
import { ContactComponent } from './Components/contact/contact.component';
import { DatePipe } from '@angular/common';
import { AboutComponent } from './Components/about/about.component';
import { GoogleMapsModule} from '@angular/google-maps';
import { FavoritesComponent } from './Components/favorites/favorites.component'


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ForgotPasswordComponent,
    GamesLibraryComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    PlaceOrderComponent,
    RegisterComponent,
    ResetPasswordComponent,
    FilterPipe,
    SearchBarComponent,
    ConfirmationDialogComponent,
    GameComponent,
    EmptyCartComponent,
    FooterComponent,
    StarRatingComponent,
    PlatformComponent,
    OrdersComponent,
    ContactComponent,
    AboutComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule, //! manually injected
    ReactiveFormsModule, //! manually injected
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    GoogleMapsModule,
    


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/Services/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private AS: AuthService, private router: Router, private cookieService: CookieService, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  login() {
    console.log(this.loginForm.value.email);
    if (!this.loginForm.value.email) {
      this.snackBar.open("❌ Please enter your email ", 'OK', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return
    }
    if (!this.loginForm.value.password) {
      this.snackBar.open("❌ Please enter your password", 'OK', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return
    }

    let loggedUser = this.loginForm.value

    this.AS.login(loggedUser).subscribe((data) => {
      const token = data.token;
      const userDataString = JSON.stringify(data.data);

      if (userDataString) {
        this.cookieService.set('loggedUser', userDataString);
        this.cookieService.set('token', token);
      }

      this.snackBar.open("Login success ✅", 'OK', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      setTimeout(() => {
        this.jumpToMain()
      }, 2000)
    }, (error) => {
      console.error('Login error:', error);
      this.snackBar.open("❌ Login failed", 'OK', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })
  }

  jumpToMain() {
    this.router.navigate(['/main']);
  }
}

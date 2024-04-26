import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private router: Router, private AS: AuthService, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    })
  }

  registerUser() {
    console.log(this.userForm.value);

    if (!this.userForm.value.name || !this.userForm.value.email || !this.userForm.value.age || !this.userForm.value.password || !this.userForm.value.confirmPassword) {
      this.snackBar.open("❌ Please complete all fields", 'OK', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return
    }

    let user = this.userForm.value
    this.AS.register(user).subscribe((response) => {
      console.log('User added', response);

      this.snackBar.open("Registration successful ✅", 'OK', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      setTimeout(() => {
        this.jumpToLogin()
      }, 4000)

    }, (error) => {
      console.log(error.error.message);
      this.snackBar.open(`${error.error.message}`, 'OK', {
        duration: 7000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })
  }

  resetForm() {
    this.userForm.reset()
  }

  jumpToLogin() {
    this.router.navigate(['/login']);
  }

}

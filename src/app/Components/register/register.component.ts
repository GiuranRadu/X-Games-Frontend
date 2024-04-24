import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;

  constructor(private router: Router, private AS: AuthService) { }


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
    let user = this.userForm.value
    this.AS.register(user).subscribe((response) => {
      console.log('User added', response);

      setTimeout(() => {
        this.jumpToLogin()
      }, 5000)

    })
  }

  resetForm() {
    this.userForm.reset()
  }

  jumpToLogin() {
    this.router.navigate(['/login']);
  }

}

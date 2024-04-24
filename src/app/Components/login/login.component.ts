import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private AS: AuthService, private router : Router,private cookieService: CookieService) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  login() {
    console.log(this.loginForm.value);
    let loggedUser = this.loginForm.value

    this.AS.login(loggedUser).subscribe((data)=>{
      const token = data.token;      
      const userDataString = JSON.stringify(data.data);

      if(userDataString){
        this.cookieService.set('loggedUser',userDataString);
        this.cookieService.set('token', token);
      }
      
      console.log('login successful');
      setTimeout(() => {
        this.jumpToMain()
      }, 2000)
    })
  }

  jumpToMain(){
    this.router.navigate(['/main']);
  }

}

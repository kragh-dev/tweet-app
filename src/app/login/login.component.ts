import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    loginId: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  errorMessage: any

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.userService.authenticate(this.loginForm).subscribe(
      (data: any) => {
        if(data['status'] == "Login Successful")
        {
          this.userService.loggedInUser = data['user']
          this.router.navigateByUrl("home")
        }
        else
        {
          this.errorMessage = data['status']
        }
      }
    )
  }

}

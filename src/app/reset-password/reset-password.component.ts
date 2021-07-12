import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup = this.formBuilder.group({
    password:['',[Validators.required, Validators.minLength(8)]]
  });
  passwordNotSame: boolean | undefined

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onConfirmPassword(event:any)
  {
    if(event.target.value != this.resetPasswordForm.value['password'])
    {
      this.passwordNotSame = true;
    }
    else
    {
      this.passwordNotSame = false;
    }
  }

  onPassword(event:any, password:string)
  {
    this.passwordNotSame = true;
    if(event.target.value != password)
    {
      this.passwordNotSame = true;
    }
    else
    {
      this.passwordNotSame = false;
    }
  }

  getUser()
  {
    return this.userService.loggedInUser
  }

  onSubmit()
  {
    this.userService.resetPassword(this.getUser().loginId, this.resetPasswordForm.value['password']).subscribe(
      (data: any) => {
        if(data['status'] == "Password reset successfully")
        {
          alert("Password has been reset")
          this.router.navigateByUrl("home")
        }
      }
    )
  }

}

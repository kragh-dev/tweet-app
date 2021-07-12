import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userCreationForm: FormGroup = this.formBuilder.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',[Validators.required, Validators.email]],
    loginId:['',Validators.required],
    contactNumber:['',[Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*$')]],
    password:['',[Validators.required, Validators.minLength(8)]],
    avatarId:['zero']
  });
  isEmailExist: boolean | undefined
  isLoginIdExist: boolean | undefined
  passwordNotSame: boolean | undefined
  isAvatarSelected: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onEmailChange(emailId:string)
  {
    console.log(emailId)
    this.userService.checkEmailLoginId('email', emailId).subscribe(
      (data: any) => {
        console.log(data)
        if(data['status'] == "No such email")
        {
          this.isEmailExist = false
        }
        else if(data['status'] == "Email already exist")
        {
          this.isEmailExist = true
        }
      }
    )
  }

  onLoginIdChange(loginId:string)
  {
    console.log(loginId)
    this.userService.checkEmailLoginId('loginId', loginId).subscribe(
      (data: any) => {
        console.log(data)
        if(data['status'] == "No such loginId")
        {
          this.isLoginIdExist = false
        }
        else if(data['status'] == "Login Id already exist")
        {
          this.isLoginIdExist = true
        }
      }
    )
  }

  onConfirmPassword(event:any)
  {
    if(event.target.value != this.userCreationForm.value['password'])
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

  onAvatarChange(avatarId: string)
  {
    this.userCreationForm.patchValue({'avatarId': avatarId})
  }

  onSubmit()
  {
    this.userService.register(this.userCreationForm).subscribe(
      (data: any) => {
        if(data['status'] == "Registered Successfully")
        {
          this.router.navigateByUrl("login")
        }
      }
    )
  }

}

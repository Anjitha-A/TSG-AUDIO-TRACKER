import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from '../authentication.service';
import { CredentialsService } from '../credentials.service';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private _credentialService :CredentialsService,
    private _router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login(){
    if(this.loginForm.valid){
      this.isLoading = true;
      console.log("form is validated")
      console.log(this.loginForm.value)
      const reqObj ={
        "username":this.loginForm.value.username,
        "password":this.loginForm.value.password
    }
      this.authenticationService.login(reqObj).subscribe(
        (response: any)=>{
          console.log(response)
          this.isLoading = false;
          if(response == "Password is incorrect, Try with the correct one..!!"){
            alert('Username or Password is incorrect, Try with the correct one..!!')
            this._router.navigate(['/login'])
          }
          this._credentialService.setCredentials(response)  
          console.log("usertype",response.usertype)       
          if(response.usertype == 1) {
            this._router.navigate(['/home']); 
          }
          if(response.usertype == 2){
            this._router.navigate(['/userhome'])
          }            
        },
        (error: any) => {
           this.isLoading = false;
          //  this.errTrue = true  
           
           console.log('response in error', error);        }       
      )
    }
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      
    });
  }
}

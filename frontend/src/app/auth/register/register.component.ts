import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from '../authentication.service';
import { CredentialsService } from '../credentials.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  registerForm!: FormGroup;
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

  ngOnInit(): void {
  }
  register(){
    if(this.registerForm.valid){
      this.isLoading = true;
      console.log("form is validated")
      console.log("form value",this.registerForm.value)
      const reqObj ={
        "fullname":this.registerForm.value.fullname,
        "username":this.registerForm.value.username,
        "password":this.registerForm.value.password
    }
      this.authenticationService.register(reqObj).subscribe(
        (response: any)=>{
          console.log(response)
          this.isLoading = false;
          console.log('response', response);
            this._router.navigate(['/login']);           
        },
        (error: any) => {
           this.isLoading = false;
          //  this.errTrue = true   
           console.log('response', error);        }       
      )
    }
  }
  private createForm() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      // remember: true,
    });
  }

}

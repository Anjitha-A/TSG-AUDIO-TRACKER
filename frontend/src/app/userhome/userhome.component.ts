import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/auth';
import { UserhomeService } from './userhome.service';





@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {
   audios : any
   searchForm!: FormGroup;
  
  constructor(private _router: Router, private userhomeService:UserhomeService, private authenticationService :AuthenticationService, private formBuilder :FormBuilder) {
    this.userhomeService.getAudios().subscribe(
      (response:any)=>{
        console.log(response)
        this.audios = response
      }
    )
    this.createForm()
   }

  ngOnInit(): void {
  }
  logout() {
    this.authenticationService.logout().subscribe(() => this._router.navigate(['/login'], { replaceUrl: true }));
  }
  view(trackid:any){ 
    this._router.navigate(["user_get_audio"],{queryParams:{id:trackid}})   
  }
  search(){
    if(this.searchForm.valid){
      console.log("form valiues",this.searchForm.value)
      const reqObj ={
        "search_value":this.searchForm.value.search_value,
    }
    console.log("req",reqObj)

      this.userhomeService.searchAudio(reqObj).subscribe(
        (response:any)=>{
          console.log("after",response)
          this.audios = response
          
        }
      )
    }
  }

  back(){
    this._router.navigate(["userhome"])
  }







  private createForm() {
    this.searchForm = this.formBuilder.group({
      search_value: ['', Validators.required]
    });
  } 

}



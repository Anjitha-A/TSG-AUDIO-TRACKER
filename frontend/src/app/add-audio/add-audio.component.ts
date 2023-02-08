import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddAudioService } from './add-audio.service';


@Component({
  selector: 'app-add-audio',
  templateUrl: './add-audio.component.html',
  styleUrls: ['./add-audio.component.scss']
})

export class AddAudioComponent implements OnInit {
 addForm!: FormGroup;
 category :any
  constructor(private addAudioService :AddAudioService,private formBuilder: FormBuilder, private _router : Router) {
    this.createForm()
   }

  ngOnInit(): void {
    this.addAudioService.getCategory().subscribe(
      (response: any)=>{
        console.log("category",response)
        this.category = response
        
      }
    )
  }
  add(){
    if(this.addForm.valid){
      console.log("form valiues",this.addForm.value)
      const reqObj ={
        "title":this.addForm.value.title,
        "artist":this.addForm.value.artist,
        "category_id":this.addForm.value.category,
        "album":this.addForm.value.album,
    }
    console.log("req",reqObj)

      this.addAudioService.addAudio(reqObj).subscribe(
        (response:any)=>{
          console.log("after",response)
          this._router.navigate(['/adminlist']);
        }
      )
    }
  }
  private createForm() {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      category: ['', Validators.required],
      album: ['', Validators.required],
    });
  } 

  

}

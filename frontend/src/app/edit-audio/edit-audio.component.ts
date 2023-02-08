import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditAudioService } from './edit-audio.service';

@Component({
  selector: 'app-edit-audio',
  templateUrl: './edit-audio.component.html',
  styleUrls: ['./edit-audio.component.scss']
})
export class EditAudioComponent implements OnInit {
  editForm!: FormGroup;
  values: any;
  constructor(private formBuilder: FormBuilder, private _router : Router, private router: ActivatedRoute, private ediAudioService :EditAudioService,
    private formControl :FormControl) { 
    // this.createForm()
  }

  ngOnInit(): void {
    const trackid  = this.router.snapshot.queryParamMap.get('id')
    console.log("trackid",trackid);
    // this.ediAudioService.getOneAudio(trackid).subscribe(
    //   (response:any)=>{
    //     console.log(response)
    //     this.editForm = new FormGroup({
    //       title : new FormControl(this.values.title),
    //       category : new FormControl(this.values.category),
    //       author : new FormControl(this.values.author),
    //       image :  new FormControl(this.values.image)

         
    //     })
    //     console.log("form",this.editForm.value)
    //   }
    // )
    
  }

  

  // private createForm() {
  //   this.editForm = this.formBuilder.group({
  //     title: ['', Validators.required],
  //     artist: ['', Validators.required],
  //     category: ['', Validators.required],
  //     album: ['', Validators.required],
  //   });
  // } 
}

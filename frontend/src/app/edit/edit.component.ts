import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditService } from './edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  category: any
  editForm!: FormGroup;
  values: any;
  response: any;

  constructor(private editService: EditService, private formBuilder: FormBuilder, private _router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const trackid = this.route.snapshot.queryParamMap.get('id')
    console.log(trackid);
    this.editService.getOneAudio(trackid).subscribe(
      (response: any) => {
        this.editService.getCategory().subscribe(
          (response: any) => {
            console.log("category", response)
            this.category = response
          }
        )
        console.log("response", response);
        this.editForm = new FormGroup({
          title: new FormControl(response.title),
          artist: new FormControl(response.artist),
          category: new FormControl(response.category),
          album: new FormControl(response.album)
        })
        console.log(this.editForm.value)

      })

  }
  edit() {

    const trackid = this.route.snapshot.queryParamMap.get('id')
    console.log("track id " , trackid)
    const reqObj = {
      "title": this.editForm.value.title,
      "artist": this.editForm.value.artist,
      "category_id": this.editForm.value.category,
      "album": this.editForm.value.album,
    }
    console.log("req",reqObj)
    // this.editService.updateAudio(trackid,reqObj).subscribe(
    //   (response: any)=>{
    //     console.log(response)
    //   }
    // )

  }

}



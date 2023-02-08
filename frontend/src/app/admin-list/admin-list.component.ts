import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminListService } from './admin-list.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  constructor( private adminlistService:AdminListService, private _router : Router ) { }
  audios :any
  trackid : any
  ngOnInit(): void {
    this.adminlistService.getAudioList().subscribe(
      (response: any)=>
      {
             console.log(response)
             this.audios=response;
      }
    )
  }
  delete(trackid:any){
    console.log(trackid)
    alert("Are you sure want to delete this audio ..?")
    this.adminlistService.deleteAudio(trackid).subscribe(
      (response:any)=>{
        console.log(response)
        this.adminlistService.getAudioList().subscribe(
          (response:any)=>{
            console.log(response)
            this.audios=response;
          }
        )

      }) 
  }
  edit(trackid:any){ 
    console.log(trackid)
    this._router.navigate(["edit"],{queryParams:{id:trackid}})   
  }

}

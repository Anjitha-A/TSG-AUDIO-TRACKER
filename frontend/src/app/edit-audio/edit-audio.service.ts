import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';



export interface EditContext {
  title: string;
  artist: string;
  category_id: string;
  album: string;
  // remember?: boolean;
}



@Injectable({
  providedIn: 'root'
})
export class EditAudioService {

  constructor(private http : HttpClient, private credentialService:CredentialsService) { }
  getOneAudio(id:any):Observable<any>{
    console.log("query",id)
    return this.http.get(`/audio/${id}`,{headers:{"Authorization": `Bearer ${this.credentialService.credentials}`}})
  }
  

}

import {Location} from "@angular/common";
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { User } from './model/user.model';
import { State } from './model/state.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http:HttpClient=inject(HttpClient);

  location:Location=inject(Location)

  notConnected:string='NOT_CONNECTED'

  // (WritableSignal), ce qui signifie qu'on peut à la fois lire et modifier sa valeur.
  private fetchUsers$:WritableSignal<State <User,HttpErrorResponse>>=
  signal(State.Builder<User,HttpErrorResponse>().forSuccess({email:this.notConnected}).build());

  //: La fonction computed est utilisée pour créer un signal basé sur une fonction qui retourne la valeur du signal fetchUsers$.
  fetchUser: Signal<State<User, HttpErrorResponse>>=computed(()=>this.fetchUsers$());


  fetchUserConnected():void{
    this.http.get<User>(`${environment.API_URL}/api/get-authenticated-user`).subscribe(
      {
        //Si tout ce passe bien
        next: user=>this.fetchUsers$.set(State.Builder<User, HttpErrorResponse>().forSuccess(user).build()),
        error:(err:HttpErrorResponse):void =>{
          if(err.status == HttpStatusCode.Unauthorized && this.isAuthenticated()){
            this.fetchUsers$.set(State.Builder<User, HttpErrorResponse>().forSuccess({email:this.notConnected}).build())
          }else{
            this.fetchUsers$.set(State.Builder<User, HttpErrorResponse>().forError(err).build())
          }
        }
      }
    )
  }
  isAuthenticated():boolean {
    if(this.fetchUsers$().value){
      return this.fetchUsers$().value?.email !== this.notConnected;
    }else{
      return false;
    }
  }

  login():void{
    location.href=`${location.origin}${this.location.prepareExternalUrl('oauth2/authorization/okta')}`
  }

  logout():void{
    this.http.post(`${environment.API_URL}/api/logout`,{},{withCredentials:true}).subscribe(
      {
        next:(response:any)=>{
          this.fetchUsers$.set(State.Builder<User,HttpErrorResponse>().forSuccess({email:this.notConnected}).build())
          location.href=response.logoutUrl
        }
      }
    )
  }
  constructor() { }
}

import { Component, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../../service/model/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  authService:AuthService=inject(AuthService);
  location:Location=inject(Location)

  connectedUser:User={email:this.authService.notConnected};

  constructor() {

    //si l'état ou la valeur retournée par fetchUser change, l'effet réagit automatiquement à ces changements
    // et met à jour connectedUser en conséquence.
    effect(()=>{
      if(this.authService.fetchUser().status == "OK"){
        this.connectedUser=this.authService.fetchUser().value!
      }
    })

    console.log(this.connectedUser)
  }

  ngOnInit(): void {
    this.authService.fetchUserConnected()
    console.log(this.connectedUser)

  }

  login():void{
    this.authService.login();
  }

  logout():void{
    this.authService.logout();
  }

  goBack():void{
    this.location.back();
  }

  goForward(){
    this.location.forward()
  }



}

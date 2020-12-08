import { Component, OnInit } from '@angular/core';
import {Institute} from './interfaces/institute';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private route:Router,private auth:AuthService) {}
model={};

ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.route.navigate(['/dashboard']);
	}
}
	
submit(){
	this.auth.addInstitute(this.model).subscribe((data)=>{
		this.auth.instId(data._id);
		this.route.navigate(['home/register']);
	})
	}


}

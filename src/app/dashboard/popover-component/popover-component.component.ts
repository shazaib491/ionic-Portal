import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/home/services/auth.service';

@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.component.html',
  styleUrls: ['./popover-component.component.scss'],
})
export class PopoverComponentComponent implements OnInit {

  constructor(public popoverController: PopoverController,
    private auth:AuthService,
    private logout:Router
    ) { }

  ngOnInit() {}
  
  onLogout(){
    this.auth.logout()
    this.popoverController.dismiss();
    this.logout.navigate(['/home/login']);
  }
}

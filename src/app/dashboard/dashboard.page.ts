import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../home/services/auth.service';
import {PopoverComponentComponent} from './popover-component/popover-component.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public popoverController: PopoverController,private auth:AuthService,private router:Router) { }

  ngOnInit() {
    
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponentComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}

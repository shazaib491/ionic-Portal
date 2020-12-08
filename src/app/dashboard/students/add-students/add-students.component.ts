import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/home/services/auth.service';
import { MainAuthService } from '../../services/main-auth.service';
import { MainFetchService } from '../../services/main-fetch.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PopoverComponentComponent } from '../../popover-component/popover-component.component';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss'],
})
export class AddStudentsComponent implements OnInit {

  constructor(public popoverController: PopoverController,private auth:AuthService,private main:MainAuthService, public alertController: AlertController,private router:Router,public toastController: ToastController) { }
model={
  e_roll:'',
  teacherId:this.auth.getUserData()._id
}
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
  submit()
  {
    this.main.addStudent(this.model).subscribe((response)=>{
      
      console.log(response);
      
      if (response.response) {
        const alert = this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Students',
          subHeader: 'Enroll Student',
          message: 'Student Successfully Enrolled.',
          buttons: ['OK']
        }).then(alertEL => {
          alertEL.present()
          this.router.navigate(['/dashboard']);
        })
      }
      else 
      {
        const toast = this.toastController.create({
          message: 'Student Already Exists!',
          duration: 2000,
          position: 'top',
          color: 'warning'
        }).then((err) => {
          err.present();
        })
        
      }

    })
  }  
}


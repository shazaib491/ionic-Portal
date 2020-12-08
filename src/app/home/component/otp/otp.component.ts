import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  model = {
    otp:''
  };
  constructor(private auth: AuthService, public alertController: AlertController, private router: Router, public toastController: ToastController) { }
  error: any;
  ngOnInit() { 
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/dashboard']);
	}
  }
  submit() {
    if (this.model.otp == this.auth.getOtp()) {
      this.auth.verifyOtp(this.model).subscribe((response) => {
        if (response.success) {
          const alert = this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Verification',
            subHeader: 'Email Verify',
            message: 'your email is verified.',
            buttons: ['OK']
          }).then(alertEL => {
            alertEL.present()
            this.router.navigate(['/dashboard']);
          })
        }
      })
    }
    else {
      this.error = "Wrong Otp";
      const toast = this.toastController.create({
        message: this.error,
        duration: 2000,
        position: 'top',
        color: 'warning'
      }).then((err) => {
        err.present();
      })

    }


  }
}

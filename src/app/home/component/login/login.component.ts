import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model = {};
  error:any;
  constructor(private auth: AuthService, private router: Router, public toastController: ToastController) { }

  ngOnInit() { }


  submit() {
    const id = this.auth.getInsId();
    this.auth.teacherLogin(this.model).subscribe((response) => {
      if (response.success) {
        this.auth.setToken(response.token);
        this.auth.storeUserData(response.user);
        this.router.navigate(['/dashboard'])
      }else
      {
        this.error = "Wrong Information";
      const toast = this.toastController.create({
        message: this.error,
        duration: 2000,
        position: 'top',
        color: 'warning'
      }).then((err) => {
        err.present();
        this.router.navigate(['/home/login']);

      })
      }

    })
  }

}

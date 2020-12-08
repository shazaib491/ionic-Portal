import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup,FormControl,FormBuilder} from '@angular/forms';
import {ActivatedRoute, Params,Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  model = {};
  form:FormGroup;
  constructor(private auth: AuthService,private fb:FormBuilder,private route:ActivatedRoute,
    private router:Router) {
    this.form=this.fb.group({
      uname:[],
      email:[],
      mobile:[],
      password:[],
      cpassword:[],
      insId:[]

    })
  }
  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/dashboard']);
	}
  }

  register() {
    this.form.patchValue({
      insId:this.auth.getInsId()
    })
    console.log(this.form.value);
    this.auth.registerTeacher(this.form.value).subscribe((response)=>{
    this.auth.otpId(response.otp);
    this.router.navigate(['home/otp'])
    })
  }


}

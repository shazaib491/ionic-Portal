import { Component, OnInit } from '@angular/core';
import { AuthService } from '../home/services/auth.service';
import { StudentAuthService } from './services/student-auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  model = {
    e_roll: '',
    pass: ''
  }

  constructor(private sAuth: StudentAuthService) { }

  ngOnInit() {
  }
  submit() {
    this.sAuth.loginByStudent(this.model).subscribe((response) => {
      console.log(response);
      
    })
  }
}

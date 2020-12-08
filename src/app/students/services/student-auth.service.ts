import { Injectable } from '@angular/core';
import { FetchAuthService } from './fetch-auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthService {

  constructor(private sFetch: FetchAuthService) { }
  loginByStudent(data: any) {
    return this.sFetch.post('student/singin', data);
  }

  setToken(token: any) {
    localStorage.setItem('token', token)
  }
  getToken() {
    return localStorage.getItem('token');
  }

  storeStudentData(student: any) {
    return localStorage.setItem('student', JSON.stringify(student))
  }
  getStudentData() {
    return JSON.parse(localStorage.getItem('student'))
  }
  studentLogout() {
    localStorage.clear()
  }
  getStudentPayload() {
    if (this.getToken()) {
      var StudentPayload = atob(this.getToken().split('.')[1])
      JSON.parse(StudentPayload)
    }
    else {
      return null
    }
  }

  isLoggedInStudent() {
    let studentPayload = this.getStudentPayload();
    if (studentPayload) {
      return studentPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}

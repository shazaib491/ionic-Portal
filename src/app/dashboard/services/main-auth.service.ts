import { Injectable } from '@angular/core';
import { MainFetchService } from './main-fetch.service';

@Injectable({
  providedIn: 'root'
})
export class MainAuthService {

  constructor(private fetch:MainFetchService) { }
  addStudent(info:any){
    return this.fetch.post('student/enroll',info);
  }
}

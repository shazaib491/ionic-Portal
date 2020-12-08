import { Injectable } from '@angular/core';
import { FetchService } from './fetch.service';
import { Institute } from '../interfaces/institute';
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private fetch: FetchService) { }

	addInstitute(data: any) {
		return this.fetch.post('institute/detail', data);
	}
	registerTeacher(data: any) {
		return this.fetch.post('teacher/singup', data);
	}
	verifyOtp(otp) {
		return this.fetch.post('teacher/verify', otp);
	}
	instId(id) {
		localStorage.setItem('id', id)
	}
	getInsId() {
		return localStorage.getItem('id')
	}

	otpId(otp) {
		return localStorage.setItem('otp', otp)
	}

	getOtp() {
		return localStorage.getItem('otp')
	}

	teacherLogin(info: any) {
		return this.fetch.post('teacher/singin', info);
	}
	// setting and getting token
	setToken(token) {
		localStorage.setItem('token', token);
	}
	getToken() {
		return localStorage.getItem('token');
	}
	// setting and getting token

	// get user info
	storeUserData(user) {
		localStorage.setItem('user', JSON.stringify(user))
	}

	getUserData() {
		return JSON.parse(localStorage.getItem('user'));
	}
	// get user info

	logout() {
		localStorage.clear()
	}

	getUserPayload() {
		if (this.getToken()) {
			var userPayload = atob(this.getToken().split('.')[1])
			return JSON.parse(userPayload)
		}
		else {
			return null;
		}
	}
	isLoggedIn() {
		let userPayload = this.getUserPayload();
		if (userPayload) {
			return userPayload.exp > Date.now() / 1000;
		}else
		{
			return false;
		}
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from "rxjs";
interface UserLogin {
  email: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async loginAndRegister(data: UserLogin) {
    const res = await lastValueFrom(this.http.post<UserLogin>('http://127.0.0.1:8000/api/login', { ...data }));
    return res;
  }

  saveUser(data: any) {
    localStorage.setItem("user", JSON.stringify({ ...data }));
  }

  getDataUser() {
    const jsonData: any = localStorage.getItem("user");
    if (!jsonData) return false;
    const user = JSON.parse(jsonData);
    return user;
  }

  getUser() {
    return this.getDataUser()?.user;
  }

  getToken() {
    return this.getDataUser()?.token;
  }
}

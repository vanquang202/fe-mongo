import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  async getList() {
    const res = await lastValueFrom(this.http.get<any>("http://127.0.0.1:8000/api/public/blog/list"))
    return res;
  }

  async store(data: any, header: any) {
    const res = await lastValueFrom(this.http.post<any>("http://127.0.0.1:8000/blog/store", { ...data }, header))
    return res;
  }
}

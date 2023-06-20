import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LetterService {

  constructor(private http: HttpClient) { }

  async store(data: any) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2));
    const res = await lastValueFrom(this.http.post('http://netfr.jimdev.top/letter/store', data, {
      headers: headers
    }));
    return res;
  }

  async update(data: any) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2));
    const res = await lastValueFrom(this.http.post('http://netfr.jimdev.top/letter/update', data, {
      headers: headers
    }));
    return res;
  }

  async delete(data: any) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2));
    const res = await lastValueFrom(this.http.post('http://netfr.jimdev.top/letter/delete', data, {
      headers: headers
    }));
    return res;
  }

  async show(data: any) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2));
    const res = await lastValueFrom(this.http.post('http://netfr.jimdev.top/letter/show', data, {
      headers: headers
    }));
    return res;
  }

  async getList(search: any = '') {
    const res = await lastValueFrom(this.http.get('http://netfr.jimdev.top/letter/getall' + search));
    return res;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImageProvider{

  constructor(private http: HttpClient) { }

  pushFileToStorage(userId, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    
      //const req = new HttpRequest('POST', `http://10.0.2.2:8080/uploadFile/${userId}`, formdata, {
      const req = new HttpRequest('POST', `http://localhost:8080/uploadFile/${userId}`, formdata, {
      // reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  pushCarPictureToStorage(userId, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    
    // const req = new HttpRequest('POST', `http://10.0.2.2:8080/uploadFile/${userId}`, formdata, {
      const req = new HttpRequest('POST', `http://localhost:8080/uploadFile/drivers/${userId}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  
}
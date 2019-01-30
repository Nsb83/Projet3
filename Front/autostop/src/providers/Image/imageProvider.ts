import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Utils/environment';
import { MessageProvider } from '../Messages/MessageProvider';

@Injectable()
export class ImageProvider {

  constructor(private http: HttpClient, private messageService: MessageProvider) { }

  pushFileToStorage(userId, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${environment.SERVER_URL}/uploadFile/${userId}`, formdata, {
      responseType: 'text'
    });
    this.messageService.myToastMethod(`Votre photo a été téléchargée`);
    return this.http.request(req);
  }

  pushCarPictureToStorage(userId, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${environment.SERVER_URL}/uploadFile/drivers/${userId}`, formdata, {
      responseType: 'text'
    });
    this.messageService.myToastMethod(`Votre photo a été téléchargée`);
    return this.http.request(req);
  }

}
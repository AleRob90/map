import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly apiUrl: string = environment.apiUrl;

  private readonly http = inject(HttpClient);

  get<Response>(
    url: string,
    data: { [key: string]: string | number | boolean } = {}
  ): Observable<Response> {
    const params = new HttpParams();
    Object.keys(data).forEach(paramKey =>
      params.append(paramKey, data[paramKey])
    );
    return this.http.get<Response>(`${this.apiUrl}/${url}`, {
      params,
    });
  }

  post<Request, Response>(url: string, data: Request): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/${url}`, data);
  }
}

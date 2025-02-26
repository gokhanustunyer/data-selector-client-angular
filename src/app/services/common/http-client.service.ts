import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  get<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T>{
    let url: string = "";
    if (requestParameter.fullEndPoint) 
    { 
      url = requestParameter.fullEndPoint 
    }
    else 
    { 
      url = `${this.Url(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}` 
    }
    if (requestParameter.isAuth)
    {
      requestParameter.headers = this.setHeaders(requestParameter.isAuth, requestParameter.headers)
    }
    return this.httpClient.get<T>(url,{headers: requestParameter.headers});
  }

  post<T>(requestParameter: Partial<RequestParameters>,body: Partial<T>): Observable<T>{
    let url = "";
    if (requestParameter.fullEndPoint) 
    { 
      url = requestParameter.fullEndPoint 
    }
    else 
    { 
      url = `${this.Url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}` 
    }
    if (requestParameter.isAuth)
    {
      requestParameter.headers = this.setHeaders(requestParameter.isAuth, requestParameter.headers)
    }
    console.log("requestParameter.headers", requestParameter.headers);
    return this.httpClient.post<T>(url, body, {headers: requestParameter.headers})
  }

  put<T>(requestParameter: Partial<RequestParameters>,body: Partial<T>): Observable<T>{
    let url = "";
    if (requestParameter.fullEndPoint) { url = requestParameter.fullEndPoint }
    else { url = `${this.Url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}` }
    return this.httpClient.put<T>(url, body, {headers: requestParameter.headers})
  }

  delete<T>(requestParameter: Partial<RequestParameters>, id: string): Observable<T>{
    let url = "";
    if (requestParameter.fullEndPoint) { url = requestParameter.fullEndPoint }
    else { url = `${this.Url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}` }
    return this.httpClient.delete<T>(url, { headers: requestParameter.headers });
  }

  private Url(requestParameter: Partial<RequestParameters>){
    return `${ requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl }/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  private getAuthToken(): string {
    const tokenData = localStorage.getItem('accessToken');
    return tokenData as string;
  }

  private setHeaders(isAuth: any, headers?: HttpHeaders): HttpHeaders {
    let httpHeaders = headers || new HttpHeaders();
    if (isAuth) {
      const authToken = this.getAuthToken();
      httpHeaders = httpHeaders.set('Authorization', `Bearer ${authToken}`);
    }
    return httpHeaders;
  }

}

export class RequestParameters{
  fullEndPoint?: string;
  headers?: HttpHeaders;
  controller?: string;
  action?: string;
  baseUrl?: string;
  queryString?: string;
  isAuth?: boolean = false;
}
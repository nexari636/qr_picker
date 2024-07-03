import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../Baseurl';
import { IListaUsuarios } from '../../models/IUsuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService 
{

  headers: HttpHeaders;
  private baseURL_registro=BASE_URL+'list_users/';

  constructor(private __httpClient: HttpClient) 
  { 
    this.headers=new HttpHeaders();
    this.headers = this.headers.set("Authorization", "Token "+localStorage.getItem("token"));
  }


  public obtener_usuarios(): Observable<IListaUsuarios[]>
  {
    return this.__httpClient.get<IListaUsuarios[]>(this.baseURL_registro,{ headers : this.headers });
  }



}

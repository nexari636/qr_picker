import { Injectable } from '@angular/core';
import { BASE_URL } from '../Baseurl';
import { HttpClient } from '@angular/common/http';
import { ILoginUsuario, IRegistroUsuario } from '../../models/IUsuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURL_registro=BASE_URL+'create_user/';
  private baseURL_login=BASE_URL+'login/';

  constructor(private __httpClient: HttpClient) { }

  public crearRegistro(usuario:IRegistroUsuario): Observable<any>
  {
    return this.__httpClient.post<IRegistroUsuario>(this.baseURL_registro,usuario);
  }

  public login(usuario: ILoginUsuario):Observable<any>
  {
    return this.__httpClient.post<ILoginUsuario>(this.baseURL_login,usuario);
  }


}

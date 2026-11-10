import { Injectable } from '@angular/core';
import { BASE_URL } from '../Baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginUsuario, IRegistroUsuario } from '../../models/IUsuario.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers: HttpHeaders;
  private baseURL_registro=BASE_URL+'create_user/';
  private baseURL_login=BASE_URL+'login/';
  private baseURL_logout=BASE_URL+'logout/';
  private baseURL_update=BASE_URL+'update_password/';

  logout_status:Boolean=false;

  constructor(private __httpClient: HttpClient) 
  {
    this.headers=new HttpHeaders();
    if(localStorage.getItem("token")!=null){
      this.headers = this.headers.set("Authorization", "Token "+localStorage.getItem("token"));
      this.logout_status=true;
    }
  
   }

  public crearRegistro(usuario:IRegistroUsuario): Observable<any>
  {
    return this.__httpClient.post<IRegistroUsuario>(this.baseURL_registro,usuario);
  }

  public login(usuario: ILoginUsuario):Observable<any>
  {
    return this.__httpClient.post<ILoginUsuario>(this.baseURL_login,usuario).pipe();
  }


  public logout():Observable<any>
  {
    if(this.logout_status)
    {
      return this.__httpClient.post<any>(this.baseURL_logout,"",{ headers : this.headers });
    }else return of({ logout: false });
  }


  public update_password(username:string,password:string):Observable<any>
  {
    let formData = new FormData();
    formData.append('usuario', username);
    formData.append('contrasenia', password);
    return this.__httpClient.post<any>(this.baseURL_update,formData);
  }



}

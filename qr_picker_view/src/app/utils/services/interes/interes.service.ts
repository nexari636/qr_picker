import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../Baseurl';
import { IInteres } from '../../models/IInteres';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteresService {

  headers: HttpHeaders;
  private baseURL_registro=BASE_URL+'create_intereses/';
  private baseURL_actualizacion=BASE_URL+'update_intereses/';
  private baseURL_desactivar=BASE_URL+'desactivate_intereses/';
  private baseURL_listar=BASE_URL+'list_intereses/';
  private baseURL_obtener_interes_by_id=BASE_URL+'get_interes_by_id/';


  constructor(private __httpClient: HttpClient) 
  { 
    this.headers=new HttpHeaders();
    this.headers = this.headers.set("Authorization", "Token "+localStorage.getItem("token"));
    //this.headers = this.headers.set("Content-Type", "multipart/form-data");
    console.log(localStorage.getItem("token"));
    console.log(this.headers);   
  }


  public crearInteres(iinteres:IInteres):Observable<any>
  {
    let formData = new FormData();
    formData.append('id_persona', iinteres.id_persona.toString());
    formData.append('interes', iinteres.interes);
    formData.append('descripcion_interes', iinteres.descripcion_interes);    
    return this.__httpClient.post<IInteres>(this.baseURL_registro,formData,{ headers : this.headers });
  }

  public actualizarInteres(iinteres:IInteres,id_interes:number):Observable<any>
  {
    let formData = new FormData();
    formData.append('id_interes', id_interes.toString());
    formData.append('id_persona', iinteres.id_persona.toString());
    formData.append('interes', iinteres.interes);
    formData.append('descripcion_interes', iinteres.descripcion_interes);
    
    return this.__httpClient.post<IInteres>(this.baseURL_actualizacion,formData,{ headers : this.headers });
  }
  
  public listar_interes(id_persona:Number):Observable<IInteres[]>
  {
    let httparam=new HttpParams();
    httparam = httparam.set('id_persona', `${id_persona}`);  
    return this.__httpClient.get<IInteres[]>(this.baseURL_listar,{ headers : this.headers, params: httparam })
  }

  public desactivar_interes(id_interes:number):Observable<any>
  {
    let httparam=new HttpParams();
    httparam = httparam.set('id_interes', `${id_interes}`);  
    return this.__httpClient.get<any>(this.baseURL_desactivar,{ headers : this.headers, params: httparam })
  }


  public obtener_interes(id_interes:number):Observable<any>
  {
    let httparam=new HttpParams();
    httparam = httparam.set('id_interes', `${id_interes}`);  
    return this.__httpClient.get<any>(this.baseURL_obtener_interes_by_id,{ headers : this.headers, params: httparam })
  }


}

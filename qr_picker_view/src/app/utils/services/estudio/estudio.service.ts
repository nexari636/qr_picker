import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../Baseurl';
import { IEstudio } from '../../models/IEstudio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {

  headers: HttpHeaders;
  private baseURL_registro=BASE_URL+'create_estudios/';
  private baseURL_actualizacion=BASE_URL+'update_estudios/';
  private baseURL_desactivar=BASE_URL+'desactivate_estudios/';
  private baseURL_listar=BASE_URL+'list_estudios/';
  private baseURL_obterner_by_id=BASE_URL+'get_estudio_by_id/';


  constructor(private __httpClient: HttpClient) 
  {
    this.headers=new HttpHeaders();
    this.headers = this.headers.set("Authorization", "Token "+localStorage.getItem("token"));
    //this.headers = this.headers.set("Content-Type", "multipart/form-data");
    console.log(localStorage.getItem("token"));
    console.log(this.headers);
  }


  public crearEstudio(iestudio:IEstudio):Observable<any>
  {
    let formData = new FormData();
    formData.append('id_persona', iestudio.id_persona.toString());
    formData.append('estudio', iestudio.estudio.toString());
    formData.append('descripcion_estudio', iestudio.descripcion_estudio);
    formData.append('fecha_inicio', iestudio.fecha_inicio.toString());
    formData.append('fecha_fin', iestudio.fecha_fin.toString());
    
    return this.__httpClient.post<IEstudio>(this.baseURL_registro,formData,{ headers : this.headers });
  }

  public actualizarEstudio(iestudio:IEstudio,id_estudio:number):Observable<any>
  {
    let formData = new FormData();
    formData.append('id_estudio', id_estudio.toString());
    formData.append('id_persona', iestudio.id_persona.toString());
    formData.append('estudio', iestudio.estudio.toString());
    formData.append('descripcion_estudio', iestudio.descripcion_estudio);
    formData.append('fecha_inicio', iestudio.fecha_inicio.toString());
    formData.append('fecha_fin', iestudio.fecha_fin.toString());
    
    return this.__httpClient.post<IEstudio>(this.baseURL_actualizacion,formData,{ headers : this.headers });
  }


  public listar_estudio(id_persona:Number):Observable<IEstudio[]>
  {
    let httparam=new HttpParams();
    httparam = httparam.set('id_persona', `${id_persona}`);  
    return this.__httpClient.get<IEstudio[]>(this.baseURL_listar,{ headers : this.headers, params: httparam })
  }

  public desactivar_estudio(id_estudio:number):Observable<any>
  {
    let httparam=new HttpParams();
    httparam = httparam.set('id_estudio', `${id_estudio}`);  
    return this.__httpClient.get<any>(this.baseURL_desactivar,{ headers : this.headers, params: httparam })
  }


  public obtener_estudio(id_estudio:number):Observable<any>
  {
    let httparam=new HttpParams();
    httparam = httparam.set('id_estudio', `${id_estudio}`);  
    return this.__httpClient.get<any>(this.baseURL_obterner_by_id,{ headers : this.headers, params: httparam })
  }



}

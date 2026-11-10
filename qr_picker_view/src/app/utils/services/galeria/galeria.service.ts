import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../Baseurl';
import { IGaleria, IGaleriaList } from '../../models/IGaleria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService 
{
  headers: HttpHeaders;
  private baseURL_registro_galeria=BASE_URL+'create_gallery/';
  private baseURL_lista_galeria=BASE_URL+'list_gallery/'; 
  private baseURL_desactivate_galeria=BASE_URL+'desactivate_gallery/'; 
  private baseURL_actualizar_galeria=BASE_URL+'update_gallery/'; 
  private baseURL_obtener_galeria=BASE_URL+'get_gallery_by_id/'; 


  constructor(private __httpClient: HttpClient) 
  { 
    this.headers=new HttpHeaders();
    this.headers = this.headers.set("Authorization", "Token "+localStorage.getItem("token"));
  }

  public crear_galeria(galeria:IGaleria):Observable<any>
  {
    let formData = new FormData();
    formData.append('id_persona', galeria.id_persona.toString());
    formData.append('descripcion_galeria', galeria.descripcion_galeria);
    formData.append('nombre_galeria', galeria.nombre_galeria);

    return this.__httpClient.post<IGaleria>(this.baseURL_registro_galeria,formData,{ headers : this.headers });
  }


  public listar_galeria(id_persona:Number):Observable<IGaleriaList[]>
  {
    let httparam=new HttpParams();
    httparam = httparam.set('id_persona', `${id_persona}`);  
    return this.__httpClient.get<IGaleriaList[]>(this.baseURL_lista_galeria,{ headers : this.headers, params: httparam })
  }

  public desactivar_galeria(id_galeria:number):Observable<any>
  {
    let httparam=new HttpParams();
    httparam = httparam.set('id_galeria', `${id_galeria}`);  
    return this.__httpClient.get<any>(this.baseURL_desactivate_galeria,{ headers : this.headers, params: httparam })
  }


  public actualizar_galeria(galeria:IGaleria,id_galeria:number):Observable<any>
  {

    let formData = new FormData();
    formData.append('id_persona', galeria.id_persona.toString());
    formData.append('descripcion_galeria', galeria.descripcion_galeria);
    formData.append('nombre_galeria', galeria.nombre_galeria);
    formData.append('id_galeria',id_galeria.toString());


    return this.__httpClient.post<IGaleria>(this.baseURL_actualizar_galeria,formData,{ headers : this.headers });
  }

  public obtener_galeria_id(id_galeria:number)
  {
    let httparam=new HttpParams();
    httparam = httparam.set('id_galeria', `${id_galeria}`); 
    return this.__httpClient.get<any>(this.baseURL_obtener_galeria,{ headers : this.headers, params: httparam }) 
  }


  getFile(url_absolute:string):Observable<any>
  {
    var header:HttpHeaders=new HttpHeaders();
    header = header.set("Content-Type", "application/json");
    return this.__httpClient.get(url_absolute,{headers: header,responseType: 'blob' as  'json'});
  }


}

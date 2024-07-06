import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../Baseurl';
import { IRecursoGaleria } from '../../models/IRecurso_Galeria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoGaleriaService 
{
  headers: HttpHeaders;
  private baseURL_registro_recursos=BASE_URL+'gallery_resource/';

  constructor(private __httpClient: HttpClient) 
  { 
    this.headers=new HttpHeaders();
    this.headers = this.headers.set("Authorization", "Token "+localStorage.getItem("token"));
  }

  public crear_recurso(recurso_galeria:IRecursoGaleria): Observable<any>
  {
    let formData = new FormData();
    formData.append('id_galeria', recurso_galeria.id_galeria.toString());
    formData.append('id_persona', recurso_galeria.id_galeria.toString());
    for(var form of recurso_galeria.imagenes_forms)
    {
      formData.append('recurso', form.recurso);
      formData.append('tipo_recurso', form.tipo_recurso.toString());
      formData.append('descripcion', form.descripcion);
    }
    
  
    console.log(this.headers);
    return this.__httpClient.post(this.baseURL_registro_recursos,formData,{ headers : this.headers });
  }

}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../Baseurl';
import { IRecursoDetalleGaleria, IRecursoGaleria } from '../../models/IRecurso_Galeria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoGaleriaService 
{
  headers: HttpHeaders;
  private baseURL_registro_recursos=BASE_URL+'gallery_resource/';
  private baseURL_lista_recursos=BASE_URL+'list_gallery_resource/';


  constructor(private __httpClient: HttpClient) 
  { 
    this.headers=new HttpHeaders();
    this.headers = this.headers.set("Authorization", "Token "+localStorage.getItem("token"));
  }

  public crear_recurso(recurso_galeria:IRecursoGaleria): Observable<any>
  {
    let formData = new FormData();
    formData.append('id_galeria', recurso_galeria.id_galeria.toString());
    for(var form of recurso_galeria.imagenes_forms)
    {
      formData.append('recurso', form.recurso);
      formData.append('tipo_recurso', form.tipo_recurso.toString());
      formData.append('descripcion', form.descripcion);
    }
    
  
    console.log(this.headers);
    return this.__httpClient.post(this.baseURL_registro_recursos,formData,{ headers : this.headers });
  }


  public listar_recursos_galeria(id_galeria:number)
  {
    let httparam=new HttpParams();
    httparam = httparam.set('id_galeria', `${id_galeria}`);  
    return this.__httpClient.get<IRecursoDetalleGaleria[]>(this.baseURL_lista_recursos,{ headers : this.headers, params: httparam });
  }


}

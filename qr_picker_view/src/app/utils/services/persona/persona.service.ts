import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../Baseurl';
import { IRegistroPersona, I_IDPersona } from '../../models/IPersona.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  headers: HttpHeaders;
  private baseURL_registro=BASE_URL+'create_person/';
  private baseURL_actualizacion=BASE_URL+'update_person/';
  private baseURL_obtener_persona_id=BASE_URL+'get_person_id/';
  private baseURL_listar_persona=BASE_URL+'list_persona_usuario/';
  private baseURL_desactivar_persona=BASE_URL+'desactivate_person/';


  constructor(private __httpClient: HttpClient) {
    this.headers=new HttpHeaders();
    this.headers = this.headers.set("Authorization", "Token "+localStorage.getItem("token"));
    //this.headers = this.headers.set("Content-Type", "multipart/form-data");
    console.log(localStorage.getItem("token"));
    console.log(this.headers);
  }

  public crearPersona(persona:IRegistroPersona): Observable<any>
  {
    let formData = new FormData();
    formData.append('cedula_persona', persona.cedula_persona);
    formData.append('nombres_persona', persona.nombres_persona);
    formData.append('apellidos_persona', persona.apellidos_persona);
    formData.append('ruta_foto_persona', persona.ruta_foto_persona);
    //formData.append('id_usuario', persona.id_usuario.toString());
    formData.append('fecha_nacimiento_persona', persona.fecha_nacimiento_persona.toString());
    formData.append('fecha_destacada', persona.fecha_destacada.toString());
    formData.append('descripcion_destacada', persona.descripcion_destacada);
    formData.append('telefono_persona', persona.telefono_persona);
    formData.append('correo_persona', persona.correo_persona);

    console.log(this.headers);
    return this.__httpClient.post<IRegistroPersona>(this.baseURL_registro,formData,{ headers : this.headers });
  }

  public actualizarPersona(persona:IRegistroPersona): Observable<any>
  {
    let formData = new FormData();
    formData.append('id_persona', persona.id_persona.toString());
    formData.append('cedula_persona', persona.cedula_persona);
    formData.append('nombres_persona', persona.nombres_persona);
    formData.append('apellidos_persona', persona.apellidos_persona);
    formData.append('ruta_foto_persona', persona.ruta_foto_persona);
    //formData.append('id_usuario', persona.id_usuario.toString());
    formData.append('fecha_nacimiento_persona', persona.fecha_nacimiento_persona.toString());
    formData.append('fecha_destacada', persona.fecha_destacada.toString());
    formData.append('descripcion_destacada', persona.descripcion_destacada);
    formData.append('telefono_persona', persona.telefono_persona);
    formData.append('correo_persona', persona.correo_persona);
    formData.append('estado_persona', persona.estado_persona);


    console.log(this.headers);
    return this.__httpClient.post<IRegistroPersona>(this.baseURL_actualizacion,formData,{ headers : this.headers });
  }


  public obtener_persona(id_persona:I_IDPersona):Observable<IRegistroPersona>
  {
    return this.__httpClient.post<IRegistroPersona>(this.baseURL_obtener_persona_id,id_persona,{ headers : this.headers });
  }


  public listar_persona():Observable<IRegistroPersona[]>
  {
    return this.__httpClient.post<IRegistroPersona[]>(this.baseURL_listar_persona,'',{ headers : this.headers });
  }

  public desactivar_persona(person_id:I_IDPersona):Observable<any>{
    return this.__httpClient.post<any>(this.baseURL_desactivar_persona,person_id,{ headers : this.headers });
  }


}

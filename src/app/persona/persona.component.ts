import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetFile } from '../utils/files';
import { PersonaService } from '../utils/services/persona/persona.service';
import { IRegistroPersona } from '../utils/models/IPersona.model';
import { UsuarioService } from '../utils/services/usuario/usuario.service';
import { IListaUsuarios } from '../utils/models/IUsuario.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Estado } from '../utils/models/IGeneral.model';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [HomeComponent,ReactiveFormsModule,NgFor,NgIf,NgClass],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent implements OnInit {

  formRegistroPersona: FormGroup;
  lista_usuarios: IListaUsuarios[];
  file:any=null;
  param_idPerson:number;

  constructor(private router:Router,private rutaParams: ActivatedRoute,private _servicePerson:PersonaService,private _listaUsers: UsuarioService)
  {
    this.param_idPerson=0;

    //obtener rutas
    this.rutaParams.params.subscribe((params: Params)=>{
      if(params["personaId"]!=undefined){
        this.param_idPerson=params["personaId"];
        console.log(this.param_idPerson+" este es el id de persona");
      }
    });


    this.formRegistroPersona=new FormGroup({
      id_person:new FormControl(this.param_idPerson.toString(),[Validators.required]),
      usuario:new FormControl("",[Validators.required]),
      cedula:new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      nombres:new FormControl("",[Validators.required,Validators.maxLength(50)]),
      apellidos:new FormControl("",[Validators.required,Validators.maxLength(50)]),
      fecha_nacimiento:new FormControl("",[Validators.required]),
      fecha_difuncion:new FormControl(""),
      descripcion:new FormControl("",[Validators.maxLength(300)]),
      telefono:new FormControl("",[Validators.maxLength(10)]),
      correo:new FormControl("",[Validators.maxLength(50)]),
      foto:new FormControl("",[Validators.required]),
      estado:new FormControl("",[Validators.required])
    });
    this.lista_usuarios=[];
  }


  ngOnInit(): void {
    this._listaUsers.obtener_usuarios().subscribe((data:IListaUsuarios[])=>{
      console.log(data);
      this.lista_usuarios=data;
    });
  }

  onSubmitRegistroPersona():void
  {
    const isformvlid=this.formRegistroPersona.valid;
    if(isformvlid)
    {
      console.log("holaa pasooo");
      //console.log(this.file);
      const persona:IRegistroPersona={
        id_persona: 0,
        cedula_persona: this.formRegistroPersona.value.cedula,
        nombres_persona: this.formRegistroPersona.value.nombres,
        apellidos_persona: this.formRegistroPersona.value.apellidos,
        id_usuario: this.formRegistroPersona.value.usuario,
        fecha_nacimiento_persona: this.formRegistroPersona.value.fecha_nacimiento,
        fecha_difuncion: this.formRegistroPersona.value.fecha_difuncion,
        descripcion_difuncion: this.formRegistroPersona.value.descripcion,
        telefono_persona: this.formRegistroPersona.value.telefono,
        correo_persona: this.formRegistroPersona.value.correo,
        ruta_foto_persona: this.file,
        estado_persona: Estado.True
      }
      console.log(persona.ruta_foto_persona);

      this._servicePerson.crearPersona(persona).subscribe(data=>{
        console.log(data);
        //if(data.created){
          //this.router.navigate(["home"])
        //}
      });

    }
    else{
      console.log("nooo paso");
    }
  }

  onSubmitActualizacionPersona():void
  {
    const isformvlid=this.formRegistroPersona.valid;
    console.log(this.formRegistroPersona)
    if(isformvlid)
    {
      const persona:IRegistroPersona={
        id_persona: this.formRegistroPersona.value.id_person,
        cedula_persona: this.formRegistroPersona.value.cedula,
        nombres_persona: this.formRegistroPersona.value.nombres,
        apellidos_persona: this.formRegistroPersona.value.apellidos,
        id_usuario: this.formRegistroPersona.value.usuario,
        fecha_nacimiento_persona: this.formRegistroPersona.value.fecha_nacimiento,
        fecha_difuncion: this.formRegistroPersona.value.fecha_difuncion,
        descripcion_difuncion: this.formRegistroPersona.value.descripcion,
        telefono_persona: this.formRegistroPersona.value.telefono,
        correo_persona: this.formRegistroPersona.value.correo,
        ruta_foto_persona: this.file,
        estado_persona: this.formRegistroPersona.value.estado,
      }

      this._servicePerson.actualizarPersona(persona).subscribe(data=>{
        console.log(data);
        //if(data.created){
          //this.router.navigate(["home"])
        //}
      });

    }
  }


  capFile(event:any)
  {
    //let h:GetFile =new GetFile(event)
    //console.log(h.get_base64().then(img=>console.log(img)));
    this.file=new GetFile(event).file;
  }

}

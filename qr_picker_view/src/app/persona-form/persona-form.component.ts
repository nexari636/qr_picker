import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetFile } from '../utils/files';
import { PersonaService } from '../utils/services/persona/persona.service';
import { IRegistroPersona, I_IDPersona } from '../utils/models/IPersona.model';
import { UsuarioService } from '../utils/services/usuario/usuario.service';
import { IListaUsuarios } from '../utils/models/IUsuario.model';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Estado } from '../utils/models/IGeneral.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [HomeComponent,ReactiveFormsModule,CommonModule,ToastModule],
  templateUrl: './persona-form.component.html',
  styleUrl: './persona-form.component.css'
})
export class PersonaFormComponent implements OnInit {

  formRegistroPersona: FormGroup;
  lista_usuarios: IListaUsuarios[];
  file:any=null;
  param_idPerson:number;


  constructor(private messageService: MessageService,private router:Router,private rutaParams: ActivatedRoute,private _servicePerson:PersonaService,private _listaUsers: UsuarioService)
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
      //id_person:new FormControl(this.param_idPerson.toString(),[Validators.required]),
      //usuario:new FormControl("",[Validators.required]),
      cedula:new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      nombres:new FormControl("",[Validators.required,Validators.maxLength(50)]),
      apellidos:new FormControl("",[Validators.required,Validators.maxLength(50)]),
      fecha_nacimiento:new FormControl("",[Validators.required]),
      fecha_destacada:new FormControl(""),
      descripcion:new FormControl("",[Validators.maxLength(300)]),
      telefono:new FormControl("",[Validators.maxLength(10)]),
      correo:new FormControl("",[Validators.maxLength(50)]),
      //foto:new FormControl("",[Validators.required]),
      estado:new FormControl("True",[Validators.required])
    });
    this.lista_usuarios=[];
  }


  ngOnInit(): void {
    this._listaUsers.obtener_usuarios().subscribe((data:IListaUsuarios[])=>{
      console.log(data);
      this.lista_usuarios=data;
    });

    if (this.param_idPerson!=0)
    {
      const persona_id:I_IDPersona={
        id_persona: this.param_idPerson,
      }

      this._servicePerson.obtener_persona(persona_id).subscribe((data:any)=>{
        console.log(data[0]);
        console.log("*******");
        var datos_persona =data[0];
        this.formRegistroPersona=new FormGroup({
          //id_person:new FormControl(this.param_idPerson.toString(),[Validators.required]),
          cedula:new FormControl(`${datos_persona.cedula_persona}`,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
          nombres:new FormControl(`${datos_persona.nombres_persona}`,[Validators.required,Validators.maxLength(50)]),
          apellidos:new FormControl(`${datos_persona.apellidos_persona}`,[Validators.required,Validators.maxLength(50)]),
          fecha_nacimiento:new FormControl(`${datos_persona.fecha_nacimiento_persona}`,[Validators.required]),
          fecha_destacada:new FormControl(`${datos_persona.fecha_destacada}`),
          descripcion:new FormControl(`${datos_persona.descripcion_destacada ?? '' }`,[Validators.maxLength(300)]),
          telefono:new FormControl(`${datos_persona.telefono_persona ?? '' }`,[Validators.maxLength(10)]),
          correo:new FormControl(`${datos_persona.correo_persona ?? '' }`,[Validators.maxLength(50)]),
          //foto:new FormControl("",[Validators.required]),
          estado:new FormControl(`${datos_persona.estado_persona}`,[Validators.required])
        });
      })
    }

    
  }

  onSubmitRegistroPersona():void
  {
    const isformvlid=this.formRegistroPersona.valid;
    console.log(this.formRegistroPersona);
    if(isformvlid)
    {
      console.log("holaa pasooo");
      //console.log(this.file);
      const persona:IRegistroPersona={
        id_persona: 0,
        cedula_persona: this.formRegistroPersona.value.cedula,
        nombres_persona: this.formRegistroPersona.value.nombres,
        apellidos_persona: this.formRegistroPersona.value.apellidos,
        fecha_nacimiento_persona: this.formRegistroPersona.value.fecha_nacimiento,
        fecha_destacada: this.formRegistroPersona.value.fecha_destacada,
        descripcion_destacada: this.formRegistroPersona.value.descripcion,
        telefono_persona: this.formRegistroPersona.value.telefono,
        correo_persona: this.formRegistroPersona.value.correo,
        ruta_foto_persona: this.file,
        estado_persona: Estado.True
      }
      console.log(persona.ruta_foto_persona);

      this._servicePerson.crearPersona(persona).subscribe(data=>{
        console.log(data);
        if(data.status==1){
          this.showSuccess(data.success);
          this.limpiar();
        }else{
          this.showError("Ha ocurrido un error en el sistema");
        }
      });

    }
    else{
      console.log("nooo paso");
      this.showError("Existen campos vacios");
    }
  }

  onSubmitActualizacionPersona():void
  {
    const isformvlid=this.formRegistroPersona.valid;
    console.log(this.formRegistroPersona)
    if(isformvlid && this.param_idPerson!=0)
    {
      const persona:IRegistroPersona={
        id_persona: this.param_idPerson,
        cedula_persona: this.formRegistroPersona.value.cedula,
        nombres_persona: this.formRegistroPersona.value.nombres,
        apellidos_persona: this.formRegistroPersona.value.apellidos,
        fecha_nacimiento_persona: this.formRegistroPersona.value.fecha_nacimiento,
        fecha_destacada: this.formRegistroPersona.value.fecha_destacada,
        descripcion_destacada: this.formRegistroPersona.value.descripcion,
        telefono_persona: this.formRegistroPersona.value.telefono,
        correo_persona: this.formRegistroPersona.value.correo,
        ruta_foto_persona: this.file,
        estado_persona: this.formRegistroPersona.value.estado,
      }

      this._servicePerson.actualizarPersona(persona)
      .pipe( 
        catchError(error => {
          this.showError("Ha ocurrido un error en el sistema");
          return of(null);
        }))
      .subscribe(data=>{
        console.log(data);
        if(data.status==1){
          this.showSuccess(data.success);
          this.limpiar();
          this.router.navigate(["persona_listar"])
        }else{
          this.showError("Ha ocurrido un error en el sistema");
        }
      });

    }else{
      this.showError("Existen campos vacios");
    }
  }


  capFile(event:any)
  {
    //let h:GetFile =new GetFile(event)
    //console.log(h.get_base64().then(img=>console.log(img)));
    this.file=new GetFile(event).file;
  }

  showSuccess(message:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


  limpiar()
  {
    this.formRegistroPersona=new FormGroup({
      //id_person:new FormControl(this.param_idPerson.toString(),[Validators.required]),
      //usuario:new FormControl("",[Validators.required]),
      cedula:new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      nombres:new FormControl("",[Validators.required,Validators.maxLength(50)]),
      apellidos:new FormControl("",[Validators.required,Validators.maxLength(50)]),
      fecha_nacimiento:new FormControl("",[Validators.required]),
      fecha_destacada:new FormControl(""),
      descripcion:new FormControl("",[Validators.maxLength(300)]),
      telefono:new FormControl("",[Validators.maxLength(10)]),
      correo:new FormControl("",[Validators.maxLength(50)]),
      //foto:new FormControl("",[Validators.required]),
      estado:new FormControl("True",[Validators.required])
    });
  }

}

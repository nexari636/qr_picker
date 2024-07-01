import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetFile } from '../utils/files';
import { PersonaService } from '../utils/services/persona/persona.service';
import { IRegistroPersona } from '../utils/models/IPersona.model';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [HomeComponent,ReactiveFormsModule],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent {

  formRegistroPersona: FormGroup;
  file:any=null;

  constructor(private router:Router,private _registroPerson:PersonaService)
  {
    this.formRegistroPersona=new FormGroup({
      usuario:new FormControl("",[Validators.required]),
      cedula:new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      nombres:new FormControl("",[Validators.required,Validators.maxLength(50)]),
      apellidos:new FormControl("",[Validators.required,Validators.maxLength(50)]),
      fecha_nacimiento:new FormControl("",[Validators.required]),
      fecha_difuncion:new FormControl(""),
      descripcion:new FormControl("",[Validators.maxLength(300)]),
      telefono:new FormControl("",[Validators.maxLength(10)]),
      correo:new FormControl("",[Validators.maxLength(50)]),
      foto:new FormControl("",[Validators.required])
    });
  }


  onSubmitRegistroPersona()
  {
    const isformvlid=this.formRegistroPersona.valid;
    if(isformvlid)
    {
      console.log("holaa pasooo");
      //console.log(this.file);
      const persona:IRegistroPersona={
        cedula_persona: this.formRegistroPersona.value.cedula,
        nombres_persona: this.formRegistroPersona.value.nombres,
        apellidos_persona: this.formRegistroPersona.value.apellidos,
        id_usuario: 7,
        fecha_nacimiento_persona: this.formRegistroPersona.value.fecha_nacimiento,
        fecha_difuncion: this.formRegistroPersona.value.fecha_difuncion,
        descripcion_difuncion: this.formRegistroPersona.value.descripcion,
        telefono_persona: this.formRegistroPersona.value.telefono,
        correo_persona: this.formRegistroPersona.value.correo,
        ruta_foto_persona: this.file
      }
      console.log(persona.ruta_foto_persona);

      this._registroPerson.crearPersona(persona).subscribe(data=>{
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

  capFile(event:any)
  {
    //let h:GetFile =new GetFile(event)
    //console.log(h.get_base64().then(img=>console.log(img)));
    this.file=new GetFile(event).file;
  }

}

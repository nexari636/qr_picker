import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EstudioService } from '../utils/services/estudio/estudio.service';
import { IEstudio } from '../utils/models/IEstudio';
import { Estado } from '../utils/models/IGeneral.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-estudio-form',
  standalone: true,
  imports: [HomeComponent,ReactiveFormsModule,CommonModule,ToastModule],
  templateUrl: './estudio-form.component.html',
  styleUrl: './estudio-form.component.css'
})
export class EstudioFormComponent implements OnInit
{

  formRegistroEstudio: FormGroup;
  num_personaId:number;
  num_estudioId:number;


  constructor(private messageService: MessageService,private rutaParams: ActivatedRoute, private router:Router, private _serviceEstudio:EstudioService)
  {
    this.num_personaId=0;
    this.num_estudioId=0;


    this.rutaParams.params.subscribe((params: Params)=>
    {
      if(params["personaId"]!=undefined){
        this.num_personaId=params["personaId"];
      }
      if(params["estudioId"]!=undefined)
      {
        this.num_estudioId=params["estudioId"];
      }
    });

    this.formRegistroEstudio=new FormGroup(
    {
      id_persona:new FormControl(this.num_personaId,[Validators.required]),
      estudio:new FormControl("",[Validators.required,Validators.maxLength(50)],),
      descripcion_estudio:new FormControl("",[Validators.required,Validators.maxLength(300)]),
      fecha_inicio:new FormControl("",[Validators.required,Validators.maxLength(300)]),
      fecha_fin:new FormControl("",[Validators.required,Validators.maxLength(300)]),
    });
  }
  ngOnInit(): void 
  {
    if(this.num_estudioId!=0)
    {
      this._serviceEstudio.obtener_estudio(this.num_estudioId).
      pipe( 
        catchError(error => {
          this.showError("Ha ocurrido un error en el sistema");
          return of(null);
        }))
      .subscribe((data)=>{
        console.log(data);
      
        this.formRegistroEstudio=new FormGroup(
          {
            id_persona:new FormControl(this.num_personaId,[Validators.required]),
            estudio:new FormControl(data.estudio,[Validators.required,Validators.maxLength(50)],),
            descripcion_estudio:new FormControl(data.descripcion_estudio,[Validators.required,Validators.maxLength(300)]),
            fecha_inicio:new FormControl(data.fecha_inicio,[Validators.required,Validators.maxLength(300)]),
            fecha_fin:new FormControl(data.fecha_fin,[Validators.required,Validators.maxLength(300)]),
          });
      });
    }

  }

  onSubmitRegistroEstudio():void
  {
    const isformvlid=this.formRegistroEstudio.valid;
    if(isformvlid)
    {
      console.log(this.formRegistroEstudio);
      const estudio:IEstudio=
      {
        id_estudio:0,
        id_persona: this.num_personaId,
        estudio: this.formRegistroEstudio.value.estudio,
        descripcion_estudio:this.formRegistroEstudio.value.descripcion_estudio,
        fecha_inicio:this.formRegistroEstudio.value.fecha_inicio,
        fecha_fin:this.formRegistroEstudio.value.fecha_fin,
        estado_estudio:Estado.False
      }

      this._serviceEstudio.crearEstudio(estudio)
      .pipe( 
        catchError(error => {
          this.showError("Ha ocurrido un error en el sistema");
          return of(null);
        }))
      .subscribe((data)=>{
        console.log(data);
        if(data.status==1){
          this.showSuccess(data.success);
          this.limpiar();
        }else{
          this.showError("Ha ocurrido un error en el sistema");
        }
      });

    }else{
      this.showError("Existen campos vacios");
    }

  }

  onSubmitActualizarEstudio():void
  {
    const isformvlid=this.formRegistroEstudio.valid;
    if(isformvlid)
    {
      console.log(this.formRegistroEstudio);
      const estudio:IEstudio=
      {
        id_estudio:0,
        id_persona: this.num_personaId,
        estudio: this.formRegistroEstudio.value.estudio,
        descripcion_estudio:this.formRegistroEstudio.value.descripcion_estudio,
        fecha_inicio:this.formRegistroEstudio.value.fecha_inicio,
        fecha_fin:this.formRegistroEstudio.value.fecha_fin,
        estado_estudio:Estado.False
      }

      this._serviceEstudio.actualizarEstudio(estudio,this.num_estudioId)
      .pipe( 
        catchError(error => {
          this.showError("Ha ocurrido un error en el sistema");
          return of(null);
        }))
      .subscribe((data)=>{
        console.log(data);
        if(data.status==1){
          this.showSuccess(data.success);
          this.limpiar();
          this.router.navigate([`listar_estudio/${this.num_personaId}`])
        }else{
          this.showError("Ha ocurrido un error en el sistema");
        }
      });

    }else{
      this.showError("Existen campos vacios");
    }

  }
  

  showSuccess(message:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  limpiar()
  {
    this.formRegistroEstudio=new FormGroup(
      {
        id_persona:new FormControl(this.num_personaId,[Validators.required]),
        estudio:new FormControl("",[Validators.required,Validators.maxLength(50)],),
        descripcion_estudio:new FormControl("",[Validators.required,Validators.maxLength(300)]),
        fecha_inicio:new FormControl("",[Validators.required,Validators.maxLength(300)]),
        fecha_fin:new FormControl("",[Validators.required,Validators.maxLength(300)]),
      });
  }

}

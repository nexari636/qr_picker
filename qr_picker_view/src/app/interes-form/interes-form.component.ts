import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InteresService } from '../utils/services/interes/interes.service';
import { IInteres } from '../utils/models/IInteres';
import { Estado } from '../utils/models/IGeneral.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-interes-form',
  standalone: true,
  imports: [HomeComponent,ReactiveFormsModule,CommonModule,ToastModule],
  templateUrl: './interes-form.component.html',
  styleUrl: './interes-form.component.css'
})
export class InteresFormComponent implements OnInit
{

  formRegistroInteres: FormGroup;
  num_personaId:number;
  num_interesId:number;

  constructor(private messageService: MessageService,private rutaParams: ActivatedRoute,private router:Router, private _serviceInteres:InteresService)
  {
    this.num_personaId=0;
    this.num_interesId=0;

    this.rutaParams.params.subscribe((params: Params)=>
      {
        if(params["personaId"]!=undefined){
          this.num_personaId=params["personaId"];
        }
        if(params["interesId"]!=undefined)
        {
          this.num_interesId=params["interesId"];
        }
    });

    this.formRegistroInteres=new FormGroup(
      {
        interes:new FormControl("",[Validators.required,Validators.maxLength(50)],),
        descripcion_interes:new FormControl("",[Validators.required,Validators.maxLength(300)]),
    });

  }
  ngOnInit(): void 
  {
    if(this.num_interesId!=0)
    {
      this._serviceInteres.obtener_interes(this.num_interesId)
      .pipe( 
        catchError(error => {
          this.showError("Ha ocurrido un error en el sistema");
          return of(null);
        }))
      .subscribe((data)=>{
        console.log(data);
        this.formRegistroInteres=new FormGroup(
          {
            interes:new FormControl(data.interes,[Validators.required,Validators.maxLength(50)],),
            descripcion_interes:new FormControl(data.descripcion_interes,[Validators.required,Validators.maxLength(300)]),
        });
      });
    }
   
  }


  onSubmitRegistroInteres():void
  {
    const isformvlid=this.formRegistroInteres.valid;
    if(isformvlid)
    {
      console.log(this.num_personaId+" chamadre");
      const interes:IInteres={
        id_interes:0,
        id_persona:this.num_personaId,
        interes: this.formRegistroInteres.value.interes,
        descripcion_interes:this.formRegistroInteres.value.descripcion_interes,
        estado_interes:Estado.False
      }
      
      this._serviceInteres.crearInteres(interes)
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
    }
    else{
      this.showError("Existen campos vacios");
    }
  }


  onSubmitActualizarInteres():void
  {
    const isformvlid=this.formRegistroInteres.valid;
    if(isformvlid)
    {
      const interes:IInteres={
        id_interes:0,
        id_persona:this.num_personaId,
        interes: this.formRegistroInteres.value.interes,
        descripcion_interes:this.formRegistroInteres.value.descripcion_interes,
        estado_interes:Estado.False
      }
      
      this._serviceInteres.actualizarInteres(interes,this.num_interesId)
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
          this.router.navigate([`listar_interes/${this.num_personaId}`])
        }else{
          this.showError("Ha ocurrido un error en el sistema");
        }
      });
    }
    else{
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
    this.formRegistroInteres=new FormGroup(
      {
        interes:new FormControl("",[Validators.required,Validators.maxLength(50)],),
        descripcion_interes:new FormControl("",[Validators.required,Validators.maxLength(300)]),
    });
  }

}

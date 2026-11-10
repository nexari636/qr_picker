import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IGaleria } from '../utils/models/IGaleria';
import { GaleriaService } from '../utils/services/galeria/galeria.service';
import { CommonModule, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-galeria-form',
  standalone: true,
  imports: [HomeComponent,ReactiveFormsModule,CommonModule,ToastModule],
  templateUrl: './galeria-form.component.html',
  styleUrl: './galeria-form.component.css'
})
export class GaleriaFormComponent implements OnInit
{

  formRegistroGaleria: FormGroup;
  num_galeria:number;
  num_persona:number;


  constructor(private messageService: MessageService,private rutaParams: ActivatedRoute,private router:Router,private _serviceGaleria:GaleriaService)
  {
    this.num_galeria=0;
    this.num_persona=0;
    this.rutaParams.params.subscribe((params: Params)=>{
      if(params["galeriaId"]!=undefined){
        this.num_galeria=params["galeriaId"];
      }
      if(params["personaId"]!=undefined){
        this.num_persona=params["personaId"];
      }
    });

    this.formRegistroGaleria=new FormGroup({
      id_galeria:new FormControl(this.num_galeria,[Validators.required]),
      nombre_galeria:new FormControl("",[Validators.required,Validators.maxLength(50)],),
      descripcion_galeria:new FormControl("",[Validators.required,Validators.maxLength(300)]),
    });
  }


  ngOnInit(): void 
  {
    if(this.num_galeria!=0)
    {
      this._serviceGaleria.obtener_galeria_id(this.num_galeria)
      .pipe( 
        catchError(error => {
          this.showError("Ha ocurrido un error en el sistema");
          return of(null);
        }))
      .subscribe((data)=>{
        this.formRegistroGaleria=new FormGroup({
          nombre_galeria:new FormControl(data.nombre_galeria,[Validators.required,Validators.maxLength(50)],),
          descripcion_galeria:new FormControl(data.descripcion_galeria,[Validators.required,Validators.maxLength(300)]),
        });
      });
    }
  }


  onSubmitRegistroGaleria():void
  {
    const isformvlid=this.formRegistroGaleria.valid;
    if(isformvlid && this.num_galeria==0)
    {
      const galeria:IGaleria=
      {
        id_persona: this.num_persona,
        nombre_galeria: this.formRegistroGaleria.value.nombre_galeria,
        descripcion_galeria: this.formRegistroGaleria.value.descripcion_galeria
      }
      this._serviceGaleria.crear_galeria(galeria)
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


  onSubmitActualizarGaleria():void
  {
    const isformvlid=this.formRegistroGaleria.valid;
    if(isformvlid && this.num_galeria!=0)
    {
      const galeria:IGaleria=
      {
        id_persona: this.num_persona,
        nombre_galeria: this.formRegistroGaleria.value.nombre_galeria,
        descripcion_galeria: this.formRegistroGaleria.value.descripcion_galeria
      }
      this._serviceGaleria.actualizar_galeria(galeria,this.num_galeria)
      .pipe( 
        catchError(error => {
          this.showError("Ha ocurrido un error en el sistema");
          return of(null);
        }))
      .subscribe((data)=>{
        console.log(data);
        if(data.status==1 || data.status==undefined){
          this.showSuccess(data.success);
          this.limpiar();
          this.router.navigate([`galeria_listar/${this.num_persona}`])
        }else{
          this.showError("Ha ocurrido un error en el sistema");
        }
      });
    }
    else{
      console.log(this.formRegistroGaleria);
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
    this.formRegistroGaleria=new FormGroup({
      nombre_galeria:new FormControl("",[Validators.required,Validators.maxLength(50)],),
      descripcion_galeria:new FormControl("",[Validators.required,Validators.maxLength(300)]),
    });
  }


}

import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { IEstudio } from '../utils/models/IEstudio';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { EstudioService } from '../utils/services/estudio/estudio.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-estudio-list',
  standalone: true,
  imports: [HomeComponent,CommonModule,RouterModule,DatePipe,ToastModule],
  templateUrl: './estudio-list.component.html',
  styleUrl: './estudio-list.component.css'
})
export class EstudioListComponent implements OnInit
{
  num_personaId:Number;
  list_estudio:IEstudio[]|null;

  constructor(private messageService: MessageService,private rutaParams: ActivatedRoute, private _serviceEstudio:EstudioService,private router:Router)
  {
    this.num_personaId=0;
    this.list_estudio=null;

    this.rutaParams.params.subscribe((params: Params)=>{
      if(params["personaId"]!=undefined){
        this.num_personaId=params["personaId"];
      }
    });

  }
  ngOnInit(): void {
    this.listar_datos_estudio();

  }

  listar_datos_estudio()
  {
    this._serviceEstudio.listar_estudio(this.num_personaId)
    .pipe( 
      catchError((error:any) => {
        this.showError("Ha ocurrido un error en el sistema");
        return of(null);
      }))
    .subscribe((data:IEstudio[]|null)=>{
      console.log(data);
      this.list_estudio=data;
    });
  }

  desactivar_estudio(id_estudio:number)
  {
    this._serviceEstudio.desactivar_estudio(id_estudio)
    .pipe( 
      catchError(error => {
        this.showError("Ha ocurrido un error en el sistema");
        return of(null);
      }))
    .subscribe(data=>{
      this.listar_datos_estudio();
    });
  }

  redireccionar_crear_estudio()
  {
    if(this.num_personaId!=0)
      this.router.navigate([`/crear_estudio/${this.num_personaId}`]);
    
  }

  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



}

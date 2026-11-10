import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { IInteres } from '../utils/models/IInteres';
import { InteresService } from '../utils/services/interes/interes.service';
import { catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-interes-list',
  standalone: true,
  imports: [HomeComponent,CommonModule,RouterModule,DatePipe,ToastModule],
  templateUrl: './interes-list.component.html',
  styleUrl: './interes-list.component.css'
})
export class InteresListComponent implements OnInit
{
  num_personaId:Number;
  list_interes:IInteres[]|null;

  constructor(private messageService: MessageService,private rutaParams: ActivatedRoute, private _serviceInteres:InteresService,private router:Router)
  {
    this.num_personaId=0;
    this.list_interes=null;

    this.rutaParams.params.subscribe((params: Params)=>{
      if(params["personaId"]!=undefined){
        this.num_personaId=params["personaId"];
      }
    });

  }

  ngOnInit(): void
  {
    this.listar_datos_interes();  
  }


  listar_datos_interes()
  {
    this._serviceInteres.listar_interes(this.num_personaId)
    .pipe( 
      catchError(error => {
        this.showError("Ha ocurrido un error en el sistema");
        return of(null);
      }))
    .subscribe((data:IInteres[]|null)=>{
      console.log(data);
      this.list_interes=data;
    });
  }

  desactivar_interes(id_interes:number)
  {
    this._serviceInteres.desactivar_interes(id_interes)
    .pipe( 
      catchError(error => {
        this.showError("Ha ocurrido un error en el sistema");
        return of(null);
      }))
    .subscribe(data=>{
      this.listar_datos_interes();
    });
  }

  redireccionar_crear_interes()
  {
    if(this.num_personaId!=0)
      this.router.navigate([`/crear_interes/${this.num_personaId}`]);
    
  }

  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}

import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RecursoGaleriaService } from '../utils/services/recurso_galeria/recurso-galeria.service';
import { IRecursoDetalleGaleria } from '../utils/models/IRecurso_Galeria';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { BASE_URL, BASE_URL_PRINCIPAL } from '../utils/services/Baseurl';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, of } from 'rxjs';

declare function preview_video():any;

@Component({
  selector: 'app-recurso-galeria-list',
  standalone: true,
  imports: [HomeComponent,CommonModule,DialogModule, ButtonModule,ToastModule],
  templateUrl: './recurso-galeria-list.component.html',
  styleUrl: './recurso-galeria-list.component.css'
})
export class RecursoGaleriaListComponent implements OnInit,AfterContentChecked
{
  urlBase: string;
  param_galeriaId: number;
  list_recursos_galeria:IRecursoDetalleGaleria[] | null;
  carga_lista:boolean;
  visible: boolean = false;
  //
  descripcion_modal:string="";
  url_recurso_modal:string="";
  tipo_recurso_modal:Boolean=true; //true==foto ; false==video

  constructor(private messageService: MessageService,private rutaParams: ActivatedRoute,private _service_recurso_galeria:RecursoGaleriaService,private router:Router)
  {
    this.urlBase=BASE_URL_PRINCIPAL
    this.param_galeriaId=0;
    this.list_recursos_galeria=null;
    this.carga_lista=true;
    //obtener rutas
    this.rutaParams.params.subscribe((params: Params)=>{
      if(params["galeriaId"]!=undefined){
        this.param_galeriaId=params["galeriaId"];
        console.log(this.param_galeriaId+" este es el id de galeria");
      }
    });
  }

  ngOnInit(): void 
  {
    console.log("inicio");
    this._service_recurso_galeria.listar_recursos_galeria(this.param_galeriaId)
    .pipe( 
      catchError(error => {
        this.showError("Ha ocurrido un error en el sistema");
        return of(null);
      }))
    .subscribe((data:IRecursoDetalleGaleria[]|null)=>{
      console.log(data);
      this.list_recursos_galeria=data;
      

    });
  }


  ngAfterContentChecked(): void {
    this.preview_video();
  }


  preview_video():any
  {
    let controls_video=document.querySelectorAll(".video_recurso");
    if(controls_video.length!=0)
    {
      console.log(controls_video);
      controls_video.forEach((control:any)=>
      {
        control.addEventListener("mouseover",(e:any)=>
        {
          let startPlayPromise = control.play();
  
          if (startPlayPromise !== undefined) 
          {
            startPlayPromise
              .then(() => {
                control.muted = true;
                control.loop = true;
              })
              .catch((e:any) => {
                console.log(e);
              });
          }
  
        });

        control.addEventListener("mouseout",(e:any)=>{
          control.pause();
        });
  
      });
    }
  }

  
  redireccionar_crear_galeria()
  {
    if(this.param_galeriaId!=0)
      this.router.navigate([`/recurso_galeria/${this.param_galeriaId}`]);
  }
  

  showDialog(descripcion:string,tipo_recurso:Boolean,url:string) 
  {
    this.descripcion_modal=descripcion;
    this.url_recurso_modal=url;
    this.tipo_recurso_modal=tipo_recurso;
    this.visible = true;
  }


  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}

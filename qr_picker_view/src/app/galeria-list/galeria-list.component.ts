import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { RecursoGaleriaService } from '../utils/services/recurso_galeria/recurso-galeria.service';
import { IGaleriaList } from '../utils/models/IGaleria';
import { GaleriaService } from '../utils/services/galeria/galeria.service';
import { HomeComponent } from '../home/home.component';
import { CommonModule, NgFor } from '@angular/common';
import { BASE_URL, BASE_URL_PRINCIPAL } from '../utils/services/Baseurl';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-galeria-list',
  standalone: true,
  imports: [HomeComponent,CommonModule,RouterModule,DialogModule, ButtonModule,ToastModule],
  templateUrl: './galeria-list.component.html',
  styleUrl: './galeria-list.component.css'
})
export class GaleriaListComponent implements OnInit
{
  param_idPerson: number;
  list_galeria:IGaleriaList[]|null;
  URL_base:string;
  visible: boolean = false;
  url_img_modal:any;

  constructor(private messageService: MessageService,private rutaParams: ActivatedRoute,private _service_recurso_galeria:GaleriaService,private router:Router)
  {
    this.url_img_modal=null;
    this.URL_base=BASE_URL_PRINCIPAL
    this.param_idPerson=0;
    this.list_galeria=null;
    this.rutaParams.params.subscribe((params: Params)=>{
      if(params["personaId"]!=undefined){
        this.param_idPerson=params["personaId"];
        console.log(this.param_idPerson+" este es el id de persona");
      }
    });
  }

  
  ngOnInit(): void 
  {
    this.listar_datos_galeria();

  }

  desactivar_galeria(id_galeria:number)
  {
    this._service_recurso_galeria.desactivar_galeria(id_galeria)
    .pipe( 
      catchError(error => {
        this.showError("Ha ocurrido un error en el sistema");
        return of(null);
      }))
    .subscribe(data=>{
      console.log(data);
      this.listar_datos_galeria();
    });
  }

  listar_datos_galeria()
  {
    this._service_recurso_galeria.listar_galeria(this.param_idPerson)
    .pipe( 
      catchError(error => {
        this.showError("Ha ocurrido un error en el sistema");
        return of(null);
      }))
    .subscribe((data:IGaleriaList[]|null)=>{
      console.log(data);
      this.list_galeria=data;
    });
  }



  redireccionar_crear_galeria()
  {
    if(this.param_idPerson!=0)
      this.router.navigate([`/galeria/${this.param_idPerson}`]);
  }


  download_qr(url_relative:string)
  {
    var dataUrl;
    this._service_recurso_galeria.getFile(this.URL_base+""+url_relative).subscribe(data=>
    {
      //alert(data.type);
      const url_download=window.URL.createObjectURL(new Blob([data],{type: data.type}))
      console.log(url_download);
      const image = new Image();
      image.src = url_download
      image.addEventListener('load', () => {
          const canvas = document.createElement('canvas');
          const width="500";
          const height="500";
          canvas.setAttribute('width', width)
          canvas.setAttribute('height', height)
          const context = canvas.getContext('2d');
          if (context!=null)
            context.drawImage(image, 0, 0, 500, 500)
          dataUrl = canvas.toDataURL('image/png')

          var link = document.createElement('a');
          console.log(dataUrl);
          link.href = dataUrl
          link.download = `qr.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    })
  }

  showDialog(url_relative:string) 
  {
    var dataUrl;
    this._service_recurso_galeria.getFile(this.URL_base+"/"+url_relative).subscribe(data=>
    {
      //alert(data.type);
      const url_download=window.URL.createObjectURL(new Blob([data],{type: data.type}))
      console.log(url_download);
      const image = new Image();
      image.src = url_download
      image.addEventListener('load', () => {
          const canvas = document.createElement('canvas');
          const width="400";
          const height="400";
          canvas.setAttribute('width', width)
          canvas.setAttribute('height', height)
          const context = canvas.getContext('2d');
          if (context!=null)
            context.drawImage(image, 0, 0, 400, 400)
          dataUrl = canvas.toDataURL('image/png')

          this.url_img_modal=dataUrl;
          this.visible = true;
      });
    });
  
  }

  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}

import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupName, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { GetFile } from '../utils/files';
import { IFormImages, IRecursoGaleria } from '../utils/models/IRecurso_Galeria'
import { RecursoGaleriaService } from '../utils/services/recurso_galeria/recurso-galeria.service';

@Component({
  selector: 'app-recurso-galeria-form',
  standalone: true,
  imports: [HomeComponent,NgFor,NgIf,ReactiveFormsModule],
  templateUrl: './recurso-galeria-form.component.html',
  styleUrl: './recurso-galeria-form.component.css'
})
export class RecursoGaleriaFormComponent implements OnInit
{
  form_recurso_galeria: FormGroup
  recurso_galeria_id:number;
  file:any=null;
  img_base:GetFile[];
  param_id_galeria:number;

  get imagenes(){
    return this.form_recurso_galeria.get("imagenes") as FormArray;
  }

  constructor(private rutaParams: ActivatedRoute,private formBuilder:FormBuilder,private _service_recurso_galeria:RecursoGaleriaService)
  {
    this.img_base=[];
    this.param_id_galeria=0;
    //obtener rutas
    this.rutaParams.params.subscribe((params: Params)=>{
      if(params["galeriaId"]!=undefined){
        this.param_id_galeria=params["galeriaId"];
      }
    });

    this.recurso_galeria_id=0;
    this.form_recurso_galeria=new FormGroup({
      id_person:new FormControl("",[Validators.required]),
      id_galeria:new FormControl(this.param_id_galeria,[Validators.required]),
      imagenes: this.formBuilder.array([])
    });
  }


  agregar_imagen()
  {
    const imagen_form:FormGroup=new FormGroup({
      recurso:new FormControl("",[Validators.required]),
      tipo_recurso:new FormControl("",[Validators.required]),
      descripcion:new FormControl("",[Validators.required]),
    });
    this.imagenes.push(imagen_form);
    this.img_base?.push(new GetFile(null));
  }


  eliminar_imagen(indice:number)
  {
    this.imagenes.removeAt(indice);
    this.img_base=this.img_base?.splice(indice,1);
    console.log(this.img_base?.length);
  }

  ngOnInit(): void 
  {
    //obtener rutas
    this.rutaParams.params.subscribe((params: Params)=>{
      if(params["recursoId"]!=undefined){
        this.recurso_galeria_id=params["recursoId"];
      }
    });
  }


  
  capFile(event:any,index:number)
  {
      //this.file=new GetFile(event).get_base64().then(dataBase64=>{
      //console.log(dataBase64)
      //console.log(index);
      
      if((index+1)<=this.img_base.length && this.img_base.length>0)
      {
        console.log("se remplazara la imagen");
        this.img_base[index]=new GetFile(event);
      }
      else{
        console.log("se agregara la imagen");
        this.img_base.push(new GetFile(event));
      }
      console.log(this.img_base.length);
    //});
    
  }


  onSubmitForm():void
  {
    const isformvlid=this.form_recurso_galeria.valid;
    if(isformvlid)
    {
      const formimg: IFormImages[]=[];
      let i = 0;
      for(var form of this.form_recurso_galeria.value.imagenes)
      {
        const form_img:IFormImages={
          tipo_recurso: form.tipo_recurso,
          descripcion: form.descripcion,
          recurso: this.img_base[i].file,
        };
        formimg.push(form_img);
        i++;
      }

      const recurso_galeria:IRecursoGaleria={
        id_galeria: this.form_recurso_galeria.value.id_galeria,
        id_persona: this.form_recurso_galeria.value.id_person,
        imagenes_forms: formimg,
      }
      this._service_recurso_galeria.crear_recurso(recurso_galeria).subscribe((data)=>{
        console.log(data);
      });
      console.log(recurso_galeria);
    }
    console.log(isformvlid);
    console.log(this.form_recurso_galeria);
  }



}

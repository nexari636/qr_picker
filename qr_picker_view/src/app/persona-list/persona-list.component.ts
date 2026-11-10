import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IRegistroPersona,I_IDPersona } from '../utils/models/IPersona.model';
import { PersonaService } from '../utils/services/persona/persona.service';
import { HomeComponent } from '../home/home.component';
import { CommonModule, NgFor } from '@angular/common';
import { catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [HomeComponent,CommonModule,RouterModule,ToastModule],
  templateUrl: './persona-list.component.html',
  styleUrl: './persona-list.component.css'
})
export class PersonaListComponent implements OnInit
{

  personas_list: IRegistroPersona[]|null;

  constructor(private messageService: MessageService,private router:Router,private _servicePerson:PersonaService)
  {
    this.personas_list=[]
  }


  ngOnInit(): void 
  {
    this.actualizarRegistros();
  }

  actualizarRegistros(){
    this._servicePerson.listar_persona()
    .pipe( 
      catchError(error => {
        this.showError("Ha ocurrido un error en el sistema");
        return of(null);
      }))
    .subscribe((data:IRegistroPersona[]|null)=>{
      console.log(data);
      this.personas_list=data;
    });
  }

  DesactivatePerson(person_id:number):void
  {
    var I_person_id:I_IDPersona=
    {
      id_persona:person_id
    }
    this._servicePerson.desactivar_persona(I_person_id)
    .pipe( 
      catchError(error => {
        this.showError("Ha ocurrido un error en el sistema");
        return of(null);
      }))
    .subscribe(data=>{
      console.log(data);
      this.actualizarRegistros();
    });
  }

  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}

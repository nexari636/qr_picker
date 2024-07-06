import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IRegistroPersona,I_IDPersona } from '../utils/models/IPersona.model';
import { PersonaService } from '../utils/services/persona/persona.service';
import { HomeComponent } from '../home/home.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [HomeComponent,NgFor,RouterModule],
  templateUrl: './persona-list.component.html',
  styleUrl: './persona-list.component.css'
})
export class PersonaListComponent implements OnInit
{

  personas_list: IRegistroPersona[];

  constructor(private router:Router,private _servicePerson:PersonaService)
  {
    this.personas_list=[]
  }


  ngOnInit(): void 
  {
    this.actualizarRegistros();
  }

  actualizarRegistros(){
    this._servicePerson.listar_persona().subscribe((data:IRegistroPersona[])=>{
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
    this._servicePerson.desactivar_persona(I_person_id).subscribe(data=>{
      console.log(data);
      this.actualizarRegistros();
    });
  }


}

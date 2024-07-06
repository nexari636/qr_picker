import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PersonaFormComponent } from './persona-form/persona-form.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { RecursoGaleriaFormComponent } from './recurso-galeria-form/recurso-galeria-form.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'persona',component:PersonaFormComponent},
    {path:'persona_actualizar/:personaId',component:PersonaFormComponent},
    {path:'persona_listar',component:PersonaListComponent},
    {path:'recurso_galeria/:galeriaId',component:RecursoGaleriaFormComponent},
    {path:"**",redirectTo:'/login',pathMatch:'full'},

];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PersonaFormComponent } from './persona-form/persona-form.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { RecursoGaleriaFormComponent } from './recurso-galeria-form/recurso-galeria-form.component';
import { RecursoGaleriaListComponent } from './recurso-galeria-list/recurso-galeria-list.component';
import { GaleriaFormComponent } from './galeria-form/galeria-form.component';
import { GaleriaListComponent } from './galeria-list/galeria-list.component';
import { EstudioFormComponent } from './estudio-form/estudio-form.component';
import { EstudioListComponent } from './estudio-list/estudio-list.component';
import { InteresFormComponent } from './interes-form/interes-form.component';
import { InteresListComponent } from './interes-list/interes-list.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'persona',component:PersonaFormComponent},
    {path:'persona_actualizar/:personaId',component:PersonaFormComponent},
    {path:'persona_listar',component:PersonaListComponent},
    {path:'recurso_galeria/:galeriaId',component:RecursoGaleriaFormComponent},
    {path:'listar_recurso_galeria/:galeriaId',component:RecursoGaleriaListComponent},
    {path:'galeria/:personaId',component:GaleriaFormComponent},
    {path:'galeria_listar/:personaId',component:GaleriaListComponent},
    {path:'galeria_actualizar/:galeriaId/:personaId',component:GaleriaFormComponent},
    {path:'crear_estudio/:personaId',component:EstudioFormComponent},
    {path:'estudio_actualizar/:personaId/:estudioId',component:EstudioFormComponent},
    {path:'listar_estudio/:personaId',component:EstudioListComponent},
    {path:'crear_interes/:personaId',component:InteresFormComponent},
    {path:'interes_actualizar/:personaId/:interesId',component:InteresFormComponent},
    {path:'listar_interes/:personaId',component:InteresListComponent},

    {path:"**",redirectTo:'/login',pathMatch:'full'},
];

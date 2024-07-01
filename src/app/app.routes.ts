import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PersonaComponent } from './persona/persona.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'persona',component:PersonaComponent},
    {path:"**",redirectTo:'/login',pathMatch:'full'}
];

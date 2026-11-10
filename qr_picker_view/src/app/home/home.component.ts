import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoginService } from '../utils/services/login/login.service';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,ToastModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService]
})
export class HomeComponent implements OnInit 
{
  constructor(private messageService: MessageService,private router:Router,private _loginService:LoginService) {

  }

  ngOnInit() {
    
  }

  redireccionar_persona(){
    this.router.navigate(["persona_listar"])
  }


  cerrar_sesion()
  {
    this._loginService.logout()
    .pipe( 
      catchError(error => {
        this.showError("Ha ocurrido un error en el sistema");
        return of(null);
      }))
    .subscribe(data=>{
      console.log(data);
      if(data.logout==true){
        this.showSuccess("Sesion cerrada correctamente");
        localStorage.removeItem("token");
        this.router.navigate(["login"])
      }else{
        this.showError("Ha ocurrido un error en el sistema");
      }
    });
  }

  showSuccess(message:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}

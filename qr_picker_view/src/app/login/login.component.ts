
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { ILoginUsuario, IRegistroUsuario } from '../utils/models/IUsuario.model';
import { LoginService } from '../utils/services/login/login.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin: FormGroup
  formRegistro: FormGroup
  formUpdate: FormGroup

  registro=2

  constructor(private messageService: MessageService,private router:Router, private _loginService:LoginService){
    this.formLogin=new FormGroup({
      usuario:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required])
    })

    this.formRegistro=new FormGroup({
      cedula:new FormControl("",[Validators.required]),
      nombres:new FormControl("",[Validators.required]),
      apellidos:new FormControl("",[Validators.required]),
      usuario:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required])
    });

    this.formUpdate=new FormGroup({
      usuario:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required]),
      Cpassword:new FormControl("",[Validators.required])
    })

  }

  onSubmitLogin(){
    const isformvlid=this.formLogin.valid;
    console.log(this.formLogin);
    if (isformvlid)
    {
      const usuario:ILoginUsuario={
        username: this.formLogin.value.usuario,
        password: this.formLogin.value.password
      }
      this._loginService.login(usuario)
        .pipe( 
          catchError(error => {
            console.log(error.error);
            this.showError(error.error.error);
            return of(null);
          }))
        .subscribe(data=>{
        //if(data.created){
        //alert(data.token);
          localStorage.setItem("token",data.token);
          this.router.navigate(["persona_listar"]);
        //}
      });
      
    }else{
      this.showError("Existen campos vacios");
    }
  }

  onSubmitRegistro(){
    const isformvlid=this.formRegistro.valid;
    console.log(this.formRegistro);
    if(isformvlid)
    {
      const usuario:IRegistroUsuario ={
        cedula_usuario: this.formRegistro.value.cedula,
        first_name: this.formRegistro.value.nombres,
        last_name: this.formRegistro.value.apellidos,
        username: this.formRegistro.value.usuario,
        password: this.formRegistro.value.password,
        email: this.formRegistro.value.email
      }
      this._loginService.crearRegistro(usuario)
      .pipe( 
        catchError(error => {
          this.showError("Ha ocurrido un error en el sistema");
          return of(null);
        }))
      .subscribe(data=>{
        console.log(data);
        this.registro=2;
      });
    }else{
      this.showError("Existen campos vacios");
    }
    
  }


  onSubmitUpdatePassword(){
    const isformvlid=this.formUpdate.valid;
    if(isformvlid)
    {
      
      if(this.formUpdate.value.password==this.formUpdate.value.Cpassword)
      {
        this._loginService.update_password(this.formUpdate.value.usuario,this.formUpdate.value.password)
        .pipe( 
          catchError(error => {
            this.showError("Ha ocurrido un error en el sistema");
            return of(null);
          }))
        .subscribe(data=>{
          if(data.status==1){
            this.showSuccess(data.success);
            this.limpiar();
            this.registro=2;
          }else{
            this.showError("Ha ocurrido un error en el sistema");
          }
        });
      }
      else{
        this.showError("Las contraseñas no coninciden");
      }
    }
    else{
      this.showError("Existen campos vacios");
    }

  }

  showSuccess(message:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showError(message:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  limpiar()
  {
    this.formLogin=new FormGroup({
      usuario:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required])
    })

    this.formRegistro=new FormGroup({
      cedula:new FormControl("",[Validators.required]),
      nombres:new FormControl("",[Validators.required]),
      apellidos:new FormControl("",[Validators.required]),
      usuario:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required])
    });

    this.formUpdate=new FormGroup({
      usuario:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required]),
      Cpassword:new FormControl("",[Validators.required])
    })
  }


}

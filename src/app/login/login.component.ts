
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { ILoginUsuario, IRegistroUsuario } from '../utils/models/IUsuario.model';
import { LoginService } from '../utils/services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin: FormGroup
  formRegistro: FormGroup
  registro=false

  constructor(private router:Router, private _loginService:LoginService){
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
      this._loginService.login(usuario).subscribe(data=>{
        //if(data.created){
          localStorage.setItem("token",data.token);
          this.router.navigate(["home"])
        //}
      });
      
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
      this._loginService.crearRegistro(usuario).subscribe(data=>{
        console.log(data);
      });
    }
    

    this.router.navigate(["home"])
  }


}

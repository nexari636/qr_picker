import { Estado } from '../models/IGeneral.model'

export interface IRegistroUsuario
{
    password:                   string;
    username:                   string;
    first_name:                 string;
    last_name:                  string;
    email:                      string;
    cedula_usuario:             string;
}

export interface ILoginUsuario
{
    username:                   string;
    password:                   string;
}

export interface ILoginUsuarioResponse
{
    created: string;
    token: string;
    user: string
}


export interface IListaUsuarios
{
    id_usuario: number,
    first_name: string,
    last_name: string,
    cedula_usuario: string,
    username: string,
    email: string,
    is_active: Estado,
    ruta_foto_usuario: string
}


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

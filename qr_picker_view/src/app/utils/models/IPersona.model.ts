import { Estado } from '../models/IGeneral.model'

export interface IRegistroPersona
{
    id_persona:number;
    cedula_persona: string;
    nombres_persona: string;
    apellidos_persona: string;
    ruta_foto_persona: any;
    fecha_nacimiento_persona: Date;
    fecha_destacada: Date;
    descripcion_destacada: string;
    telefono_persona: string;
    correo_persona: string;
    estado_persona: Estado
}


export interface I_IDPersona
{
    id_persona:number;
}





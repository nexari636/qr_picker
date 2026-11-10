import { Estado } from "./IGeneral.model";

export interface IGaleria
{
    id_persona: number,
    nombre_galeria: string,
    descripcion_galeria: string
}


export interface IGaleriaList
{
    id_galeria: number,
    id_persona: number,
    nombre_galeria: string,
    descripcion_galeria: string,
    ruta_qr: string,
    estado_galeria: Estado,
}

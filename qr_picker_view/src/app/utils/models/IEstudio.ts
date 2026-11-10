import { Estado } from "./IGeneral.model";

export interface IEstudio
{
    id_estudio:number,
    id_persona: number,
    estudio: string,
    descripcion_estudio: string,
    fecha_inicio: Date,
    fecha_fin: Date,
    estado_estudio:Estado
}

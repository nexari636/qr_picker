import { Estado } from "./IGeneral.model";

export interface IInteres
{
    id_interes:number,
    id_persona: number,
    interes: string,
    descripcion_interes: string,
    estado_interes:Estado
}

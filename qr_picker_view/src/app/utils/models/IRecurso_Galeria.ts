export interface IRecursoGaleria{
    id_galeria: number;
    imagenes_forms: IFormImages[]
}


export interface IFormImages{
    tipo_recurso: number,
    descripcion: string,
    recurso:any,
}


export interface IRecursoDetalleGaleria
{
    id_recursos_galeria: number,
    ruta_recurso: string,
    descripcion_recurso_galeria: string,
    fecha_creacion_recurso_galeria: string,
    fecha_modificacion_recurso_galeria: string,
    estado_recurso_galeria: boolean,
    id_galeria: number
    id_tipo_recurso: number,
    id_persona: number,
    id_usuario: number
}
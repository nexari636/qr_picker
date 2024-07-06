export interface IRecursoGaleria{
    id_galeria: number;
    id_persona: number;
    imagenes_forms: IFormImages[]
}


export interface IFormImages{
    tipo_recurso: number,
    descripcion: string,
    recurso:any,
}
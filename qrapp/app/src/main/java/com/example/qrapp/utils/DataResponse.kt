package com.example.qrapp.utils

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class DataResponse
    (
        @SerializedName("id_persona") val id_persona:String,
        @SerializedName("cedula_persona") val cedula_persona:String,
        @SerializedName("nombres_persona") val nombres_persona:String,
        @SerializedName("apellidos_persona") val apellidos_persona:String,
        @SerializedName("ruta_foto_persona") val ruta_foto_persona:String,
        @SerializedName("fecha_nacimiento_persona") val fecha_nacimiento_persona:String,
        @SerializedName("fecha_destacada") val fecha_destacada:String,
        @SerializedName("descripcion_destacada") val descripcion_destacada:String,
        @SerializedName("galerias") val galerias:List<GaleriaResponse>,
        @SerializedName("estudios") val estudios:List<EstudiosResponse>,
        @SerializedName("intereses") val intereses:List<InteresesResponse>,
        ) : Serializable

data class GaleriaResponse
    (
        @SerializedName("id_galeria") val id_galeria:Int,
        @SerializedName("id_persona") val id_persona:Int,
        @SerializedName("nombre_galeria") val nombre_galeria:String,
        @SerializedName("descripcion_galeria") val descripcion_galeria:String,
        @SerializedName("estado_galeria") val estado_galeria:String,
        @SerializedName("recursos_galeria") val recursosGaleria:List<RecursosGaleriaResponse>,


    ): Serializable

data class RecursosGaleriaResponse
    (
        @SerializedName("id_recursos_galeria") val id_recursos_galeria:Int,
        @SerializedName("ruta_recurso") val ruta_recurso:String,
        @SerializedName("descripcion_recurso_galeria") val descripcion_recurso_galeria:String,
        @SerializedName("id_tipo_recurso") val id_tipo_recurso:TipoRecursosResponse,

    ): Serializable

data class TipoRecursosResponse
    (
        @SerializedName("id_tipo_recurso") val id_tipo_recurso:Int,
        @SerializedName("recurso") val recurso:String,
        @SerializedName("estado_tipo_recurso") val estado_tipo_recurso:String,
    ): Serializable

data class EstudiosResponse(
    @SerializedName("estudio") val estudio:String,
    @SerializedName("descripcion_estudio") val descripcion_estudio:String,
    @SerializedName("fecha_inicio") val fecha_inicio:String,
    @SerializedName("fecha_fin") val fecha_fin:String

):Serializable

data class InteresesResponse(
    @SerializedName("interes") val interes:String,
    @SerializedName("descripcion_interes") val descripcion_interes:String
):Serializable

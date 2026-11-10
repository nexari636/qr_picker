package com.example.qrapp.utils

import retrofit2.Response
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.POST

interface ApiService
{
    @FormUrlEncoded
    @POST("/api/list_gallery_android/")
    suspend fun getInformacionGaleria(@Field("id_persona") id_persona:String):Response<DataResponse>;
}
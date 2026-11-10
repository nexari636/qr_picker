package com.example.qrapp.utils

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class RetrofitService
{
    fun getRetrofit(): Retrofit
    {
        val retrofit= Retrofit
            .Builder()
            .baseUrl(UrlAPI.URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        return retrofit;
    }
}
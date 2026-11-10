package com.example.qrapp.utils

import com.google.gson.Gson

class DeserializeDataQR(var data_qr:String)
{
    fun deserializable():DataQR
    {
        return Gson().fromJson(data_qr,DataQR::class.java)
    }
}


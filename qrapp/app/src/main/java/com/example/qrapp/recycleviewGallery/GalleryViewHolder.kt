package com.example.qrapp.recycleviewGallery

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.databinding.ItemGalleryBinding
import com.example.qrapp.utils.DataResponse
import com.example.qrapp.utils.GaleriaResponse

class GalleryViewHolder(val binding: ItemGalleryBinding) : RecyclerView.ViewHolder(binding.root)
{

    fun render(Data: GaleriaResponse, nombre_persona:String,apellidos_persona:String)
    {
        binding.nombres.text=nombre_persona;
        binding.apellidos.text=apellidos_persona;
        binding.galeriaName.text=Data.nombre_galeria;
        binding.descripcion.text=Data.descripcion_galeria;
    }
}
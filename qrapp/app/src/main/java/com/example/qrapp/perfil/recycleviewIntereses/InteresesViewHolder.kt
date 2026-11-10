package com.example.qrapp.perfil.recycleviewIntereses

import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.databinding.ItemGalleryBinding
import com.example.qrapp.databinding.ItemInteresesBinding
import com.example.qrapp.utils.GaleriaResponse
import com.example.qrapp.utils.InteresesResponse

class InteresesViewHolder(val binding: ItemInteresesBinding): RecyclerView.ViewHolder(binding.root)
{

    fun render(Data: InteresesResponse)
    {
        binding.interes.text=Data.interes;
        binding.descripcion.text=Data.descripcion_interes;
    }

}
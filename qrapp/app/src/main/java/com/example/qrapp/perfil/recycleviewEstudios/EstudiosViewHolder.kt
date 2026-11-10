package com.example.qrapp.perfil.recycleviewEstudios

import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.databinding.ItemEstudiosBinding
import com.example.qrapp.databinding.ItemGalleryBinding
import com.example.qrapp.databinding.ItemPersonaBinding
import com.example.qrapp.utils.EstudiosResponse
import com.example.qrapp.utils.GaleriaResponse

class EstudiosViewHolder(val binding:ItemEstudiosBinding): RecyclerView.ViewHolder(binding.root)
{
    fun render(Data: EstudiosResponse)
    {
        binding.estudio.text=Data.estudio;
        binding.descripcion.text=Data.descripcion_estudio;
        binding.fechaInicio.text=Data.fecha_inicio;
        binding.fechaFin.text=Data.fecha_fin;
    }
}
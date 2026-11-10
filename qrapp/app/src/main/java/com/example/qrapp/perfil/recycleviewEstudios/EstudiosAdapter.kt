package com.example.qrapp.perfil.recycleviewEstudios

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.databinding.ItemEstudiosBinding
import com.example.qrapp.databinding.ItemGalleryBinding
import com.example.qrapp.recycleviewGallery.GalleryViewHolder
import com.example.qrapp.utils.DataResponse

class EstudiosAdapter(private val data: DataResponse) : RecyclerView.Adapter<EstudiosViewHolder>()
{
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EstudiosViewHolder {
        val binding= ItemEstudiosBinding.inflate(LayoutInflater.from(parent.context),parent,false);
        return EstudiosViewHolder(binding);
    }

    override fun getItemCount(): Int
    {
        return data.estudios.size;
    }

    override fun onBindViewHolder(holder: EstudiosViewHolder, position: Int) {
        holder.render(data.estudios.get(position))
    }


}
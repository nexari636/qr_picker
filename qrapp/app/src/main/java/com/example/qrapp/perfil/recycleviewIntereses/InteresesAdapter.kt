package com.example.qrapp.perfil.recycleviewIntereses

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.databinding.ItemGalleryBinding
import com.example.qrapp.databinding.ItemInteresesBinding
import com.example.qrapp.perfil.recycleviewEstudios.EstudiosViewHolder
import com.example.qrapp.recycleviewGallery.GalleryViewHolder
import com.example.qrapp.utils.DataResponse

class InteresesAdapter(private val data: DataResponse) : RecyclerView.Adapter<InteresesViewHolder>()
{
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): InteresesViewHolder {
        val binding= ItemInteresesBinding.inflate(LayoutInflater.from(parent.context),parent,false)
        return InteresesViewHolder(binding);
    }

    override fun getItemCount(): Int
    {
        return data.intereses.size;
    }

    override fun onBindViewHolder(holder: InteresesViewHolder, position: Int) {
        holder.render(data.intereses.get(position))
    }

}
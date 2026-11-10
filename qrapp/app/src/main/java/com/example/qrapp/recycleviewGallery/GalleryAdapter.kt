package com.example.qrapp.recycleviewGallery

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.PersonViewHolder
import com.example.qrapp.R
import com.example.qrapp.databinding.ItemGalleryBinding
import com.example.qrapp.utils.DataResponse
import com.example.qrapp.utils.GaleriaResponse

class GalleryAdapter(private val data: DataResponse,private val select_recurso_galeria:(Int)->Unit)
    : RecyclerView.Adapter<GalleryViewHolder>()
{
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GalleryViewHolder {
        //val view = LayoutInflater.from(parent.context).inflate(R.layout.item_gallery,parent,false);
        val binding=ItemGalleryBinding.inflate(LayoutInflater.from(parent.context),parent,false)
        return GalleryViewHolder(binding);
    }

    override fun getItemCount(): Int {
        return data.galerias.size;
    }

    override fun onBindViewHolder(holder: GalleryViewHolder, position: Int) {
        holder.render(data.galerias.get(position),data.nombres_persona,data.apellidos_persona)
        holder.itemView.setOnClickListener{select_recurso_galeria(position)}
    }

}
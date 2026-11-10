package com.example.qrapp.recycleviewRecursoGallery

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.databinding.ActivityItemRecursoGalleryBinding
import com.example.qrapp.databinding.ItemGalleryBinding
import com.example.qrapp.recycleviewGallery.GalleryViewHolder
import com.example.qrapp.utils.DataResponse
import com.example.qrapp.utils.RecursosGaleriaResponse

class RecursoGalleryAdapter(private val data:DataResponse,
                            private val recurso_gal: List<RecursosGaleriaResponse>,
                            private val insert_recurso_modal:(String,String)->Unit)
    : RecyclerView.Adapter<RecursoGalleryViewHolder>()
{
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecursoGalleryViewHolder
    {
        val binding= ActivityItemRecursoGalleryBinding.inflate(LayoutInflater.from(parent.context),parent,false)
        return RecursoGalleryViewHolder(binding)
    }

    override fun getItemCount(): Int
    {
        return recurso_gal.size;
    }

    override fun onBindViewHolder(holder: RecursoGalleryViewHolder, position: Int)
    {
        holder.render(recurso_gal.get(position))
        holder.itemView.setOnClickListener{
            insert_recurso_modal(recurso_gal.get(position).ruta_recurso,recurso_gal.get(position).id_tipo_recurso.recurso)
        }
    }

}

package com.example.qrapp.recycleviewRecursoGallery

import android.media.MediaMetadataRetriever
import android.media.ThumbnailUtils
import android.util.Log
import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.databinding.ActivityItemRecursoGalleryBinding
import com.example.qrapp.utils.RecursosGaleriaResponse
import com.example.qrapp.utils.UrlAPI
import com.squareup.picasso.Picasso
import java.io.File

class RecursoGalleryViewHolder(val binding: ActivityItemRecursoGalleryBinding):RecyclerView.ViewHolder(binding.root)
{
    fun render(Data: RecursosGaleriaResponse)
    {
        if(Data.id_tipo_recurso.recurso.lowercase() =="video") {
            Log.i("recursoooo", "es video");

            //para obtener la miniatura del video
            var a=MediaMetadataRetriever();
            a.setDataSource(UrlAPI.Companion.URL+Data.ruta_recurso)
            var bipmap=a.getFrameAtTime();
            a.release();
            binding.imgLogo.setImageBitmap(bipmap);


        }else
        {
            Log.i("recursoooo","es imagen");
            Picasso.get().load(UrlAPI.Companion.URL+Data.ruta_recurso).into(binding.imgLogo);
        }


        binding.descripcion.text=Data.descripcion_recurso_galeria;
    }


}
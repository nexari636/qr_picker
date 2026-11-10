package com.example.qrapp

import android.app.Dialog
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.VideoView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.EscanerActivity.Companion.KEY_DATA_RESPONSE
import com.example.qrapp.EscanerActivity.Companion.KEY_POSITION_RECURSO_GALERIA
import com.example.qrapp.databinding.ActivityRecursoGaleriaBinding
import com.example.qrapp.recycleviewRecursoGallery.RecursoGalleryAdapter
import com.example.qrapp.utils.DataResponse
import com.example.qrapp.utils.UrlAPI
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.squareup.picasso.Picasso
import java.io.ByteArrayInputStream
import java.io.ObjectInputStream


class ActivityRecursoGaleria : AppCompatActivity()
{
    private lateinit var binding: ActivityRecursoGaleriaBinding;
    private lateinit var position_recurso_galeria: Number;
    private lateinit var rvRecursoGaleria: RecyclerView;
    private lateinit var objDataResponse: DataResponse;

    private var position = 0

    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding=ActivityRecursoGaleriaBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        init();
        init_recyclerView();
    }

    fun init()
    {
        var bytes_person = getIntent().getByteArrayExtra(KEY_DATA_RESPONSE);
        val bis = ByteArrayInputStream(bytes_person)
        val ois = ObjectInputStream(bis)
        objDataResponse = ois.readObject() as DataResponse;
        //
        position_recurso_galeria=getIntent().getIntExtra(KEY_POSITION_RECURSO_GALERIA,0)
        //
        rvRecursoGaleria=binding.rvData;
    }

    fun init_recyclerView()
    {
        var recurso_galeria_adapter=RecursoGalleryAdapter(objDataResponse,objDataResponse.galerias.get(position_recurso_galeria as Int).recursosGaleria,{x,y->dialog_insert_recurso(x,y)})
        rvRecursoGaleria.layoutManager=LinearLayoutManager(this,LinearLayoutManager.VERTICAL,false)
        rvRecursoGaleria.adapter=recurso_galeria_adapter
    }

    private fun dialog_insert_recurso(url_recurso:String,tipo:String)
    {
        try {
            val dialog = Dialog(this)
            dialog.setContentView(R.layout.activity_dialog_recursos)

            val params = dialog.window!!.attributes
            params.width = ViewGroup.LayoutParams.MATCH_PARENT
            params.height = ViewGroup.LayoutParams.WRAP_CONTENT
            dialog.window!!.attributes = params

            val btn_cerrar: FloatingActionButton = dialog.findViewById(R.id.btn_cerrar)
            btn_cerrar.setOnClickListener {
                dialog.hide();
            }

            if(tipo.lowercase() =="video"){
                val recurso_video:VideoView=dialog.findViewById(R.id.recurso_video)
                recurso_video.visibility= View.VISIBLE

                //val mc: MediaController = MediaController(this)
                //mc.setAnchorView(recurso_video)
                val path = Uri.parse(UrlAPI.URL+url_recurso)

                //recurso_video.setMediaController(mc)
                recurso_video.setVideoURI(path)
                recurso_video.requestFocus()
                recurso_video.start()

                recurso_video.setOnClickListener{
                    if(recurso_video.isPlaying())
                    {
                        Log.i("holaaa","stop")

                        recurso_video.pause()
                    }else
                    {
                        recurso_video.start()
                    }
                }
            }
            else{
                val recurso_imagen:ImageView=dialog.findViewById(R.id.recurso_imagen)
                recurso_imagen.visibility= View.VISIBLE
                Picasso.get().load(UrlAPI.Companion.URL+url_recurso).into(recurso_imagen);

            }

            dialog.show()
        }
        catch (e:Exception){
            Log.i("ERROR_MODAL",e.message.toString())
        }
    }


}
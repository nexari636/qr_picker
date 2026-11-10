package com.example.qrapp

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.EscanerActivity.Companion.KEY_DATA_RESPONSE
import com.example.qrapp.EscanerActivity.Companion.KEY_POSITION_RECURSO_GALERIA
import com.example.qrapp.databinding.ActivityListGalleryBinding
import com.example.qrapp.perfil.ActivityPerfil
import com.example.qrapp.recycleviewGallery.GalleryAdapter
import com.example.qrapp.utils.DataResponse
import com.example.qrapp.utils.UrlAPI
import com.google.android.material.floatingactionbutton.FloatingActionButton
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.ObjectInputStream
import java.io.ObjectOutputStream

class ActivityListGallery : AppCompatActivity()
{
    private lateinit var binding: ActivityListGalleryBinding
    private lateinit var objDataResponse:DataResponse
    private lateinit var rvGaleria:RecyclerView
    private lateinit var btn_perfil:FloatingActionButton;

    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding=ActivityListGalleryBinding.inflate(layoutInflater)
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
        rvGaleria=binding.rvData;

        btn_perfil=binding.btnPerfil;
        btn_perfil.setOnClickListener{
            try {
                val intent = Intent(this@ActivityListGallery, ActivityPerfil::class.java);
                val bos = ByteArrayOutputStream();
                val oos = ObjectOutputStream(bos);
                oos.writeObject(objDataResponse);
                oos.flush();
                intent.putExtra(KEY_DATA_RESPONSE, bos.toByteArray())
                startActivity(intent)
            }catch (e: Exception) {
                Log.i("dfdsf",e.message.toString());
            }
        };

    }

    fun init_recyclerView()
    {
        var galeria_adapter=GalleryAdapter(objDataResponse,{select_recurso_galeria(it)})
        rvGaleria.layoutManager=LinearLayoutManager(this,LinearLayoutManager.VERTICAL,false)
        rvGaleria.adapter=galeria_adapter
    }


    fun select_recurso_galeria(position: Int)
    {
        val intent = Intent(this@ActivityListGallery, ActivityRecursoGaleria::class.java)

        val bos = ByteArrayOutputStream()
        val oos = ObjectOutputStream(bos)
        oos.writeObject(objDataResponse)
        oos.flush()

        intent.putExtra(KEY_POSITION_RECURSO_GALERIA,position)
        intent.putExtra(KEY_DATA_RESPONSE,bos.toByteArray())
        startActivity(intent)

        Log.i("selecciono_el_item",position.toString());
    }





}
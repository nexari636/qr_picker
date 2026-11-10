package com.example.qrapp.perfil

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.qrapp.EscanerActivity.Companion.KEY_DATA_RESPONSE
import com.example.qrapp.R
import com.example.qrapp.databinding.ActivityEscanerBinding
import com.example.qrapp.databinding.ActivityInteresesBinding
import com.example.qrapp.perfil.recycleviewEstudios.EstudiosAdapter
import com.example.qrapp.perfil.recycleviewIntereses.InteresesAdapter
import com.example.qrapp.recycleviewGallery.GalleryAdapter
import com.example.qrapp.utils.DataResponse
import java.io.ByteArrayInputStream
import java.io.ObjectInputStream

class ActivityIntereses : AppCompatActivity() {

    private lateinit var binding:ActivityInteresesBinding;
    private lateinit var objDataResponse:DataResponse;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding= ActivityInteresesBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        init();
    }

    fun init()
    {
        var bytes_person = getIntent().getByteArrayExtra(KEY_DATA_RESPONSE);
        val bis = ByteArrayInputStream(bytes_person)
        val ois = ObjectInputStream(bis)
        objDataResponse = ois.readObject() as DataResponse;

        var intereses_adapter= InteresesAdapter(objDataResponse)
        binding.rvData.layoutManager= LinearLayoutManager(this, LinearLayoutManager.VERTICAL,false)
        binding.rvData.adapter=intereses_adapter
    }


}
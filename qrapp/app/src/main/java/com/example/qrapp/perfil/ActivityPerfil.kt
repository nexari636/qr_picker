package com.example.qrapp.perfil

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.qrapp.EscanerActivity.Companion.KEY_DATA_RESPONSE
import com.example.qrapp.R
import com.example.qrapp.databinding.ActivityEscanerBinding
import com.example.qrapp.databinding.ActivityListGalleryBinding
import com.example.qrapp.databinding.ActivityPerfilBinding
import com.example.qrapp.utils.DataResponse
import com.example.qrapp.utils.UrlAPI
import com.squareup.picasso.Picasso
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.ObjectInputStream
import java.io.ObjectOutputStream

class ActivityPerfil : AppCompatActivity()
{
    private lateinit var binding: ActivityPerfilBinding;
    private lateinit var objDataResponse: DataResponse;
    private lateinit var btn_estudios:Button;
    private lateinit var btn_intereses:Button;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding=ActivityPerfilBinding.inflate(layoutInflater);
        setContentView(binding.root);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        init();
        llenar_campos();
        init_buttons_intereses_estudios();
    }

    fun init()
    {
        var bytes_person = getIntent().getByteArrayExtra(KEY_DATA_RESPONSE);
        val bis = ByteArrayInputStream(bytes_person)
        val ois = ObjectInputStream(bis)
        objDataResponse = ois.readObject() as DataResponse;
        btn_estudios=binding.buttonEstudios;
        btn_intereses=binding.buttonIntereses;
    }

    fun llenar_campos()
    {
        if(!objDataResponse.ruta_foto_persona.isBlank() || !objDataResponse.ruta_foto_persona.isEmpty())
        {
            Picasso.get().load(UrlAPI.Companion.URL+objDataResponse.ruta_foto_persona).into(binding.imageViewProfile);
        }else{
            binding.imageViewProfile.setImageResource(R.drawable.personp)
        }
        binding.textViewCedula.text="Cedula: "+objDataResponse.cedula_persona;
        binding.textViewNombres.text="Nombres: "+objDataResponse.nombres_persona;
        binding.textViewApellidos.text="Apellidos: "+objDataResponse.apellidos_persona;
        binding.textViewBirthDate.text="Fecha nacimiento: "+objDataResponse.fecha_nacimiento_persona;
        binding.textViewDeathDate.text="Fecha destacada: "+objDataResponse.fecha_destacada;
        binding.textViewDeathDescription.text="Descripción: "+objDataResponse.descripcion_destacada;
    }

    fun init_buttons_intereses_estudios()
    {
        btn_estudios.setOnClickListener{
            val intent = Intent(this@ActivityPerfil, ActivityEstudios::class.java);
            val bos = ByteArrayOutputStream()
            val oos = ObjectOutputStream(bos)
            oos.writeObject(objDataResponse)
            oos.flush()
            intent.putExtra(KEY_DATA_RESPONSE,bos.toByteArray())
            startActivity(intent)
        }

        btn_intereses.setOnClickListener{

            val intent = Intent(this@ActivityPerfil, ActivityIntereses::class.java);
            val bos = ByteArrayOutputStream()
            val oos = ObjectOutputStream(bos)
            oos.writeObject(objDataResponse)
            oos.flush()
            intent.putExtra(KEY_DATA_RESPONSE,bos.toByteArray())
            startActivity(intent)
        }
    }





}
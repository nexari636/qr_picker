package com.example.qrapp

import android.os.Bundle
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.qrapp.databinding.ActivityEscanerBinding
import com.example.qrapp.databinding.ActivityListPersonBinding
import java.io.ByteArrayInputStream
import java.io.ObjectInputStream

class ListPerson : AppCompatActivity() {

    private lateinit var listaPersona:List<Persona>;
    private lateinit var binding:ActivityListPersonBinding;
    private lateinit var rvList:RecyclerView;
    private lateinit var personadapter:PersonAdapter;


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding= ActivityListPersonBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        try {

            var bytes_person = getIntent().getByteArrayExtra("list_person");
            val bis = ByteArrayInputStream(bytes_person)
            val ois = ObjectInputStream(bis)
            val clone = ois.readObject() as List<Persona>;
            Toast.makeText(
                this,
                "Scanned: " + clone[0].nombre,
                Toast.LENGTH_LONG
            ).show()
        }catch (e: Exception)
        {
            Toast.makeText(
                this,
                "Scanned: " +e.message,
                Toast.LENGTH_LONG
            ).show()
        }

        rvList=binding.rvData;

        init();
    }

    private fun initPersona():List<Persona> {
        val persona_uno=Persona("Jhon1","Leturne1",20)
        val persona_dos=Persona("Jhon2","Leturne2",21)
        val persona_tres=Persona("Jhon3","Leturne3",22)
        val persona_cuatro=Persona("Jhon4","Leturne4",23)
        return listOf(persona_uno,persona_dos,persona_tres,persona_cuatro);
    }


    private fun init()
    {
        personadapter=PersonAdapter(initPersona());
        rvList.layoutManager=LinearLayoutManager(this,LinearLayoutManager.VERTICAL,false);
        rvList.adapter=personadapter
    }







}
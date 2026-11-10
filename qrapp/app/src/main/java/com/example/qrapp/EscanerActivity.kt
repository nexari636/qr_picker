package com.example.qrapp

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.qrapp.databinding.ActivityEscanerBinding
import com.example.qrapp.utils.ApiService
import com.example.qrapp.utils.DataQR
import com.example.qrapp.utils.DataResponse
import com.example.qrapp.utils.DeserializeDataQR
import com.example.qrapp.utils.RetrofitService
import com.journeyapps.barcodescanner.ScanContract
import com.journeyapps.barcodescanner.ScanIntentResult
import com.journeyapps.barcodescanner.ScanOptions
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Response
import java.io.ByteArrayOutputStream
import java.io.ObjectOutputStream


class EscanerActivity : AppCompatActivity()
{

    companion object{
        var KEY_DATA_RESPONSE:String="data_api_response";
        var KEY_POSITION_RECURSO_GALERIA:String="pos_recurso_galeria";
    }


    private lateinit var binding:ActivityEscanerBinding;
    private lateinit var listaPersona:List<Persona>;
    private lateinit var obj_Dataqr:DataQR;
    private lateinit var objDataResponse:Response<DataResponse>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        binding=ActivityEscanerBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnescaner.setOnClickListener { initButton() }
        binding.btnactdos.setOnClickListener { navegar_personas() }


        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        initPersona();

    }



    private val barcodeLauncher = registerForActivityResult<ScanOptions, ScanIntentResult>( ScanContract())
    { result: ScanIntentResult ->

        if (result.contents == null) {
            Toast.makeText(this, "Cancelled", Toast.LENGTH_LONG).show()
        } else {

            if(result.contents.contains("id_galeria")) {
                Log.i("holaaaa","dddddd"+result.contents);
                var obj_dese: DeserializeDataQR = DeserializeDataQR(result.contents)

                obj_Dataqr = obj_dese.deserializable()
                Log.i("holaaaa","dddddd"+obj_Dataqr.id_persona);

                GetInformacionAPI(obj_Dataqr.id_persona.toString());
            }
            else
            {
                Log.i("holaaaa","noooooooooo");

                Toast.makeText(
                    this,
                    "No se puede leer el codigo QR",
                    Toast.LENGTH_LONG
                ).show()
            }
            /*Toast.makeText(
                this,
                "Scanned: " + obj_Dataqr.id_persona,
                Toast.LENGTH_LONG
            ).show()*/
        }

    }

    private fun initButton() {
        val options = ScanOptions()
        options.setOrientationLocked(true);
        barcodeLauncher.launch(options)
    }

    private fun GetInformacionAPI(id_persona:String)
    {
        CoroutineScope(Dispatchers.IO).launch {
            objDataResponse = RetrofitService().getRetrofit().create(ApiService::class.java).getInformacionGaleria(id_persona);
            if(objDataResponse.isSuccessful){
               try {
                   Log.i("informacion", "La informacion fue cargada correctamente")
                   //abrir otra actividad
                   val intent = Intent(this@EscanerActivity, ActivityListGallery::class.java)
                   val bos = ByteArrayOutputStream()
                   val oos = ObjectOutputStream(bos)
                   oos.writeObject(objDataResponse.body())
                   oos.flush()

                   intent.putExtra(KEY_DATA_RESPONSE, bos.toByteArray());
                   startActivity(intent)
               }catch (e: Exception)
               {
                   Log.i("informacion", e.message.toString())
               }
            }
            else{




            }
        }
    }


    //******//


    private fun initPersona() {
        val persona_uno=Persona("Jhon1","Leturne1",20)
        val persona_dos=Persona("Jhon2","Leturne2",21)
        val persona_tres=Persona("Jhon3","Leturne3",22)
        val persona_cuatro=Persona("Jhon4","Leturne4",23)
        listaPersona = listOf(persona_uno,persona_dos,persona_tres,persona_cuatro)
    }


    private fun navegar_personas()
    {
        val intent =Intent(this,ListPerson::class.java)

        val bos = ByteArrayOutputStream()
        val oos = ObjectOutputStream(bos)
        oos.writeObject(this.listaPersona)
        oos.flush()

        intent.putExtra("list_person",bos.toByteArray());
        startActivity(intent)
    }


}
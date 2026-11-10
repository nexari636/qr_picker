package com.example.qrapp

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class PersonViewHolder(view: View) : RecyclerView.ViewHolder(view) {

    private val nombre:TextView=view.findViewById(R.id.nombre);
    private val apellido:TextView=view.findViewById(R.id.apellido);

    fun render(person:Persona)
    {
        nombre.text=person.nombre;
        apellido.text=person.apellido;
    }


}
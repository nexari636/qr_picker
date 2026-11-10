package com.example.qrapp

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView

class PersonAdapter(private val dataperson: List<Persona>):RecyclerView.Adapter<PersonViewHolder>()
{

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PersonViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_persona,parent,false);
        return PersonViewHolder(view);
    }

    override fun getItemCount(): Int {
        return dataperson.size;
    }

    override fun onBindViewHolder(holder: PersonViewHolder, position: Int) {
        holder.render(dataperson[position])
    }

}
from django.db import models
from qr_picker.choices.general import *
from qr_picker.model.model_persona import *

class Model_Gusto(models.Model):
    id_estudio=models.BigAutoField(primary_key=True,verbose_name="Id estudio",db_column="id_estudio")
    id_persona=models.ForeignKey(Model_Persona,null=False,blank=False,verbose_name="Id persona",db_column="id_persona",on_delete=models.CASCADE)
    gusto=models.TextField(max_length=100,null=False,blank=False,verbose_name="Estudio",db_column="estudio")
    descripcion_gusto=models.TextField(max_length=500,null=False,blank=False,verbose_name="Descripcion gusto",db_column="descripcion_gusto")
    estado_gusto=models.TextField(default=True,max_length=5,choices=CHOICE_ESTADO,verbose_name="Estado",db_column="estado_gusto")

    def __str__(self) -> str:
        return self.gusto
    
    class Meta:
        app_label = "qr_picker"
        db_table = 'tbl_gusto'
        ordering = ["gusto"]
        managed = True
        verbose_name = 'un gusto'
        verbose_name_plural = 'gustos'

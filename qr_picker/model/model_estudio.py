from django.db import models
from qr_picker.choices.general import *
from qr_picker.model.model_persona import *

class Model_Estudio(models.Model):
    id_estudio=models.BigAutoField(primary_key=True,verbose_name="Id estudio",db_column="id_estudio")
    id_persona=models.ForeignKey(Model_Persona,verbose_name="Id persona",db_column="id_persona",on_delete=models.CASCADE, null=False, blank=False)
    estudio=models.TextField(max_length=50,null=False,blank=False,verbose_name="Estudio",db_column="estudio")
    descripcion_estudio=models.TextField(max_length=500,null=False,blank=False,verbose_name="Descripcion estudio",db_column="descripcion_estudio")
    fecha_inicio=models.DateTimeField(blank=False,null=False)
    fecha_fin=models.DateTimeField(blank=False,null=False)
    estado_estudio=models.TextField(default=True,max_length=5,choices=CHOICE_ESTADO,verbose_name="Estado",db_column="estado_estudio")

    def __str__(self) -> str:
        return self.estudio
    
    class Meta:
        app_label = "qr_picker"
        db_table = 'tbl_estudio'
        ordering = ["estudio"]
        managed = True
        verbose_name = 'un estudio'
        verbose_name_plural = 'estudios'

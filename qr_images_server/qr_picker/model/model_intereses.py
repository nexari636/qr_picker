from django.db import models
from qr_picker.choices.general import *
from qr_picker.model.model_persona import *

class Model_Interes(models.Model):
    id_interes=models.BigAutoField(primary_key=True,verbose_name="Id interes",db_column="id_interes")
    id_persona=models.ForeignKey(Model_Persona,null=False,blank=False,verbose_name="Id persona",db_column="id_persona",on_delete=models.CASCADE)
    interes=models.TextField(max_length=100,null=False,blank=False,verbose_name="Interes",db_column="interes")
    descripcion_interes=models.TextField(max_length=500,null=False,blank=False,verbose_name="Descripcion interes",db_column="descripcion_interes")
    estado_interes=models.BooleanField(default=True,max_length=5,choices=CHOICE_ESTADO,verbose_name="Estado",db_column="estado_interes")

    def __str__(self) -> str:
        return self.interes
    
    class Meta:
        app_label = "qr_picker"
        db_table = 'tbl_interes'
        ordering = ["interes"]
        managed = True
        verbose_name = 'un interes'
        verbose_name_plural = 'intereses'

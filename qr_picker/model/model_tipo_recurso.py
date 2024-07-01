from django.db import models
from qr_picker.choices.general import *

class Model_Tipo_Recurso(models.Model):
    id_tipo_recurso=models.BigAutoField(primary_key=True,verbose_name="Id tipo recurso",db_column="id_tipo_recurso")
    recurso=models.TextField(max_length=20,null=False,blank=False,verbose_name="Recurso",db_column="recurso")
    estado_tipo_recurso=models.TextField(default=True,choices=CHOICE_ESTADO,verbose_name="Estado",db_column="estado_tipo_recurso")

    def __str__(self) -> str:
        return self.recurso
    
    class Meta:
        app_label = "qr_picker"
        db_table = 'tbl_tipo_recurso'
        ordering = ["recurso"]
        managed = True
        verbose_name = 'un tipo usuario'
        verbose_name_plural = 'tipo usuarios'

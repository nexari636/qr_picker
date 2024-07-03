from django.db import models
from qr_picker.choices.general import *
from qr_picker.model.model_usuario import *
from django.core.validators import FileExtensionValidator
import os,uuid

def rename_file(instance, filename):
    print("esta es la funcion instance photo= ",instance)
    ext = os.path.splitext(filename)[1]  # Obtiene la extensión del archivo
    new_filename = f"{uuid.uuid4().hex}{ext}"  # Genera un nombre de archivo aleatorio
    return os.path.join('persona/', new_filename)

class Model_Persona(models.Model):
    id_persona=models.BigAutoField(primary_key=True,verbose_name="Id persona",db_column="id_persona")
    cedula_persona=models.TextField(unique=True,max_length=10,verbose_name="Cedula",db_column="cedula_persona")
    id_usuario= models.ForeignKey(Model_Usuario,verbose_name='Id usuario', db_column='id_usuario', on_delete=models.CASCADE, null=False, blank=False)
    nombres_persona=models.TextField(max_length=50,null=False,blank=False,verbose_name="Nombres",db_column="nombres_persona")
    apellidos_persona=models.TextField(max_length=50,null=False,blank=False,verbose_name="Apellidos",db_column="apellidos_persona")
    ruta_foto_persona=models.ImageField(upload_to=rename_file,null=True,blank=True,verbose_name="Foto Persona",db_column="ruta_foto_persona",validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg'])])
    fecha_nacimiento_persona=models.DateField(null=False,blank=False,verbose_name="Fecha Nacimiento",db_column="fecha_nacimiento_persona")
    fecha_difuncion=models.DateField(null=True,blank=True,verbose_name="Fecha difuncion",db_column="fecha_difuncion")
    descripcion_difuncion=models.TextField(max_length=300,null=True,blank=True,verbose_name="Descripcion difuncion",db_column="descripcion_difuncion")
    telefono_persona=models.TextField(max_length=10,null=True,blank=True,verbose_name="Telefono",db_column="telefono_persona")
    correo_persona=models.TextField(max_length=50,null=True,blank=True,verbose_name="Correo",db_column="correo_persona")
    fecha_creacion_persona=models.DateTimeField(blank=False,null=False, auto_now_add=True, verbose_name='Fecha de creación')
    fecha_modificacion_persona=models.DateTimeField(blank=False,null=False,  auto_now=True, verbose_name='Fecha de modificación')
    estado_persona=models.TextField(default=True,choices=CHOICE_ESTADO,verbose_name="Estado",db_column="estado_persona")

    def __str__(self) -> str:
        return self.nombres_persona+" "+self.apellidos_persona
    
    class Meta:
        app_label = "qr_picker"
        db_table = 'tbl_persona'
        ordering = ["nombres_persona","apellidos_persona"]
        managed = True
        verbose_name = 'una persona'
        verbose_name_plural = 'personas'


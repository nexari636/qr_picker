from django.db import models
from qr_picker.choices.general import *
from qr_picker.model.model_galeria import *
from qr_picker.model.model_tipo_recurso import *
from qr_picker.model.model_persona import *
from qr_picker.model.model_usuario import *

def rename_file(instance, filename):
    print("esta es la funcion instance photo= ",instance)
    ext = os.path.splitext(filename)[1]  # Obtiene la extensión del archivo
    new_filename = f"{uuid.uuid4().hex}{ext}"  # Genera un nombre de archivo aleatorio
    return os.path.join('recursos/', new_filename)

class Model_Recursos_Galeria(models.Model):
    id_recursos_galeria=models.BigAutoField(primary_key=True,verbose_name="Id recursos galeria",db_column="id_recursos_galeria")
    id_galeria= models.ForeignKey(Model_Galeria,verbose_name='Id galeria', db_column='id_galeria', on_delete=models.CASCADE, null=False, blank=False)
    id_tipo_recurso=models.ForeignKey(Model_Tipo_Recurso,verbose_name='Id recurso', db_column='id_tipo_recurso', on_delete=models.CASCADE, null=False, blank=False)
    ruta_recurso=models.FileField(upload_to=rename_file,null=False,blank=False,db_column="ruta_recurso",validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'mp4'])])
    descripcion_recurso_galeria=models.TextField(max_length=300,choices=CHOICE_ESTADO,verbose_name="Desripcion recurso galeria",db_column="descripcion_recurso_galeria")
    fecha_creacion_recurso_galeria=models.DateTimeField(blank=False,null=False, auto_now_add=True,db_column="fecha_creacion_recurso_galeria")
    fecha_modificacion_recurso_galeria=models.DateTimeField(blank=False,null=False,  auto_now=True, db_column="fecha_modificacion_recurso_galeria")
    estado_recurso_galeria=models.BooleanField(default=True,choices=CHOICE_ESTADO,verbose_name="Estado",db_column="estado_recurso_galeria")


    class Meta:
        app_label = "qr_picker"
        db_table = 'tbl_recurso_galeria'
        ordering = ["id_recursos_galeria"]
        managed = True
        verbose_name = 'un recurso galeria'
        verbose_name_plural = 'recursos galeria'
from django.db import models
from qr_picker.choices.general import *
from qr_picker.model.model_persona import *


def rename_file(instance, filename):
    print("esta es la funcion instance photo= ",instance)
    ext = os.path.splitext(filename)[1]  # Obtiene la extensión del archivo
    new_filename = f"{uuid.uuid4().hex}{ext}"  # Genera un nombre de archivo aleatorio
    return os.path.join('qrs/', new_filename)

class Model_Galeria(models.Model):
    id_galeria=models.BigAutoField(primary_key=True,verbose_name="Id galeria",db_column="id_galeria")
    id_persona=models.ForeignKey(Model_Persona,verbose_name='Id persona', db_column='id_persona', on_delete=models.CASCADE, null=False, blank=False)
    id_usuario=models.ForeignKey(Model_Usuario,verbose_name='Id usuario', db_column='id_usuario', on_delete=models.CASCADE, null=False, blank=False)
    nombre_galeria=models.TextField(unique=True,max_length=100,default=True,verbose_name="Nombre galeria",db_column="nombre_galeria")
    descripcion_galeria=models.TextField(max_length=300,verbose_name="Desripcion galeria",db_column="descripcion_galeria")
    ruta_qr=models.ImageField(upload_to=rename_file,null=True,blank=True,db_column="ruta_qr",validators=[FileExtensionValidator(allowed_extensions=['svg'])])
    fecha_creacion_galeria=models.DateTimeField(blank=False,null=False, auto_now_add=True,db_column="fecha_creacion_galeria")
    fecha_modificacion_galeria=models.DateTimeField(blank=False,null=False,  auto_now=True, db_column="fecha_modificacion_galeria")
    estado_galeria=models.BooleanField(default=True,max_length=5,choices=CHOICE_ESTADO,verbose_name="Estado",db_column="estado_galeria")

    def __str__(self) -> str:
        return self.nombre_galeria
    
    class Meta:
        app_label = "qr_picker"
        db_table = 'tbl_galeria'
        ordering = ["nombre_galeria"]
        managed = True
        verbose_name = 'una galeria'
        verbose_name_plural = 'galerias'

from django.db import models
from qr_picker.choices.general import *
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
import os,uuid

def rename_file(instance, filename):
    print("esta es la funcion instance photo= ",instance)
    ext = os.path.splitext(filename)[1]  # Obtiene la extensión del archivo
    new_filename = f"{uuid.uuid4().hex}{ext}"  # Genera un nombre de archivo aleatorio
    return os.path.join('user/', new_filename)

class Model_Usuario(AbstractUser):
    id_usuario=models.BigAutoField(primary_key=True,verbose_name="Id usuario",db_column="id_usuario")
    ruta_foto_usuario=models.ImageField(upload_to=rename_file,null=True,blank=True,verbose_name="Foto Usuario",db_column="ruta_foto_usuario",validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg'])])    
    cedula_usuario=models.TextField(unique=True,max_length=10,verbose_name="Cedula usuario",db_column="cedula_usuario")
    fecha_modificacion_usuario=models.DateTimeField(blank=False,null=False,  auto_now=True, verbose_name='Fecha de modificación')
    estado_usuario=models.BooleanField(default=True,choices=CHOICE_ESTADO,verbose_name="Estado",db_column="estado_usuario")

    def __str__(self) -> str:
        return self.username
    
    def save(self, *args, **kwargs):
        self.set_password(self.password)
        super(Model_Usuario, self).save(*args, **kwargs)

    def validate_user(self):
        return self.set_password(self.password)


# class Model_Usuario(models.Model):
#     id_usuario=models.BigAutoField(primary_key=True,verbose_name="Id usuario",db_column="id_usuario")
#     cedula_usuario=models.TextField(max_length=10,verbose_name="Cedula usuario",db_column="cedula_usuario")
#     id_tipo_usuario = models.ForeignKey(Model_Tipo_Usuario,verbose_name='Tipo Usuario', db_column='id_tipo_usuario', on_delete=models.CASCADE, null=False, blank=False)
#     nombres_usuario=models.TextField(max_length=50,null=False,blank=False,verbose_name="Nombres",db_column="nombres")
#     apellidos_usuario=models.TextField(max_length=50,null=False,blank=False,verbose_name="Apellidos",db_column="apellidos")
#     ruta_foto_usuario=models.TextField(null=True,blank=True,verbose_name="Foto Usuario",db_column="ruta_foto_usuario")
#     correo=models.TextField(max_length=30,null=True,blank=True,verbose_name="Correo",db_column="correo")
#     fecha_nacimiento_usuario=models.DateField(null=False,blank=False,verbose_name="Fecha Nacimiento",db_column="fecha_nacimiento")
#     fecha_creacion_usuario=models.DateTimeField(blank=False,null=False, auto_now_add=True, verbose_name='Fecha de creación')
#     fecha_modificacion_usuario=models.DateTimeField(blank=False,null=False,  auto_now=True, verbose_name='Fecha de modificación')
#     estado_usuario=models.TextField(default=True,choices=CHOICE_ESTADO,verbose_name="Estado",db_column="estado_usuario")


#     def __str__(self) -> str:
#         return self.nombres+' '+self.apellidos
    
#     class Meta:
#         app_label = "qr_picker"
#         db_table = 'tbl_usuario'
#         ordering = ["nombres_usuario","apellidos_usuario"]
#         managed = True
#         verbose_name = 'un usuario'
#         verbose_name_plural = 'usuarios'
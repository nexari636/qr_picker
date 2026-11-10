from rest_framework import serializers
from qr_picker.model.model_usuario import *

class Serializer_Usuario(serializers.ModelSerializer):
    class Meta:
        model=Model_Usuario
        fields='__all__'


class Serializer_Usuario_LIST(serializers.ModelSerializer):
    class Meta:
        model=Model_Usuario
        fields=("id_usuario","first_name","last_name","cedula_usuario","username","email","is_active","ruta_foto_usuario")

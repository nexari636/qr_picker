from rest_framework import serializers
from qr_picker.model.model_galeria import *
from qr_picker.serializador.seria_persona import Serializer_Persona

class Serializer_Galeria(serializers.ModelSerializer):
    class Meta:
        model=Model_Galeria
        fields='__all__'


class Serializer_Galeria_LIST(serializers.ModelSerializer):

    class Meta:
        model=Model_Galeria
        fields=("id_galeria","id_persona","nombre_galeria","descripcion_galeria","ruta_qr","estado_galeria")

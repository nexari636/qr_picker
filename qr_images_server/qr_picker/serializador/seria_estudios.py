from rest_framework import serializers
from qr_picker.model.model_estudio import *
from qr_picker.serializador.seria_persona import Serializer_Persona

class Serializer_Estudios(serializers.ModelSerializer):
    class Meta:
        model=Model_Estudio
        fields='__all__'

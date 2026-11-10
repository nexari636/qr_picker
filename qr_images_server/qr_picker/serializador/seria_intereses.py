from rest_framework import serializers
from qr_picker.model.model_intereses import *
from qr_picker.serializador.seria_persona import Serializer_Persona

class Serializer_Intereses(serializers.ModelSerializer):
    class Meta:
        model=Model_Interes
        fields='__all__'

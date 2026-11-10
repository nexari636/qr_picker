from rest_framework import serializers
from qr_picker.model.model_persona import *

class Serializer_Persona(serializers.ModelSerializer):
    class Meta:
        model=Model_Persona
        fields='__all__'
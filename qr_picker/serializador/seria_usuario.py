from rest_framework import serializers
from qr_picker.model.model_usuario import *

class Serializer_Usuario(serializers.ModelSerializer):
    class Meta:
        model=Model_Usuario
        fields='__all__'
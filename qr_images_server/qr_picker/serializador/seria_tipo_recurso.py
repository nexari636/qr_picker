from rest_framework import serializers
from qr_picker.model.model_recurso_galeria import *

class Serializer_Tipo_Recurso(serializers.ModelSerializer):

    class Meta:
        model=Model_Tipo_Recurso
        fields='__all__'
from rest_framework import serializers
from qr_picker.model.model_recurso_galeria import *
from qr_picker.serializador.seria_tipo_recurso import *

class Serializer_Recursos_Galeria(serializers.ModelSerializer):

    id_tipo_recurso=Serializer_Tipo_Recurso()

    class Meta:
        model=Model_Recursos_Galeria
        fields='__all__'
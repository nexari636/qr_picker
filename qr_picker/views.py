from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from qr_picker.serializador.seria_usuario import *
from rest_framework.response import Response
from rest_framework import status
from qr_picker.utils.json_error_msg import *
from qr_picker.model.model_usuario import *
from rest_framework.authtoken.models import Token

from rest_framework.decorators import authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from qr_picker.model.model_persona import *
from qr_picker.serializador.seria_persona import *

# Create your views here.


@api_view(['POST'])
def guardar_usuario(request):
    if request.method == 'POST':
        seria_usuario=Serializer_Usuario(data=request.data)
        if seria_usuario.is_valid():
            seria_usuario.save()
            #return Response(seria_usuario.data, status=status.HTTP_201_CREATED)
            return Response(dic_to_json_convert(dic_data_success),status=status.HTTP_201_CREATED)
        else:
            print(seria_usuario.errors)
            return Response(dic_to_json_convert(dic_data_error_campos_faltantes), status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response(dic_to_json_convert(dic_data_error_solicitud),status=status.HTTP_406_NOT_ACCEPTABLE)
    

@api_view(['POST'])
#@authentication_classes([TokenAuthentication])
#@permission_classes([IsAuthenticated])
def login(request):
    if request.method == 'POST':
        seria_usuario=Serializer_Usuario(data=request.data)
        seria_usuario.is_valid()
        data=seria_usuario.data

        print(data)

        username=data["username"]
        password=data["password"]

        print(data["password"])
        print(data["username"])

        user=get_object_or_404(Model_Usuario,username=username)

        if(user.check_password(password)):
            print("existe")
            token, created=Token.objects.get_or_create(user=user)
            return Response({
                "user": username,
                "token": token.key,
                "created":created
            },status=status.HTTP_202_ACCEPTED)
        else:
            return Response({
                "error": "El usuario no existe o la contraseña es incorrecta"
            },status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response(dic_to_json_convert(dic_data_error_solicitud),status=status.HTTP_406_NOT_ACCEPTABLE)
    


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    if request.method == 'POST':
        print(request.user)
        request.user.auth_token.delete()
        return Response({
                "logout": True,
            },status=status.HTTP_200_OK)
    else:
        return Response(dic_data_error_solicitud,status=status.HTTP_406_NOT_ACCEPTABLE)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def guardar_persona(request):
    if request.method == 'POST':
        seria_persona=Serializer_Persona(data=request.data)
        
        if seria_persona.is_valid():
            seria_persona.save()
            return Response(dic_data_success,status=status.HTTP_201_CREATED)
        else:
            print(seria_persona.errors)
            print(seria_persona.is_valid())
            print(seria_persona.data)
            return Response(dic_data_error_campos_faltantes, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("2")
        return Response(dic_data_error_solicitud,status=status.HTTP_406_NOT_ACCEPTABLE)
    

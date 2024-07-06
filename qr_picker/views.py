from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from qr_picker.serializador.seria_usuario import *
from rest_framework.response import Response
from rest_framework import status
from qr_picker.utils.json_error_msg import *
from qr_picker.model.model_usuario import *
from qr_picker.model.model_recurso_galeria import *
from rest_framework.authtoken.models import Token

from rest_framework.decorators import authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from qr_picker.model.model_persona import *
from qr_picker.serializador.seria_persona import *

# Create your views here.

@api_view(['POST'])
def guardar_usuario(request):
    
    errors_messages=[]
    
    if request.method == 'POST':

        try:

            seria_usuario=Serializer_Usuario(data=request.data)
            if seria_usuario.is_valid():
                seria_usuario.save()
                #return Response(seria_usuario.data, status=status.HTTP_201_CREATED)
                return Response(dic_data_success,status=status.HTTP_201_CREATED)
            else:
                print(seria_usuario.errors)

                for key,values in seria_usuario.errors.items():
                    print(values[0])
                    errors_messages.append(values[0])

                return Response(array_errors(errors_messages), status=status.HTTP_406_NOT_ACCEPTABLE)
        
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_406_NOT_ACCEPTABLE)
    

@api_view(['POST'])
#@authentication_classes([TokenAuthentication])
#@permission_classes([IsAuthenticated])
def login(request):
    if request.method == 'POST':

        try:
            seria_usuario=Serializer_Usuario(data=request.data)
            seria_usuario.is_valid()
            data=seria_usuario.data

            print(str(data),'ddd')

            username=data["username"]
            password=data["password"]

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
            
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_406_NOT_ACCEPTABLE)
    

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    if request.method == 'POST':
        try:

            print(request.user)
            request.user.auth_token.delete()
            return Response({
                    "logout": True,
                },status=status.HTTP_200_OK)
        
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def guardar_persona(request):

    errors_messages=[]

    if request.method == 'POST':

        id_usuario_session=request.user.id_usuario

        seria_persona=Serializer_Persona(data=request.data)
        
        if seria_persona.is_valid():
            seria_persona.save()
            return Response(dic_data_success,status=status.HTTP_201_CREATED)
        else:
            print(seria_persona.errors)
            print(seria_persona.is_valid())
            print(seria_persona.data)

            for key,values in seria_persona.errors.items():
                print(values[0])
                errors_messages.append(values[0])

            return Response(array_errors(errors_messages), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_406_NOT_ACCEPTABLE)

   
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_persona(request):

    errors_messages=[]

    if request.method == 'POST':

        try:
            #seria_persona=Serializer_Persona(data=request.data)
            #seria_persona.is_valid()
            #if seria_persona.is_valid():
            id_usuario_session=request.user.id_usuario

            data_person=request.data
            print(data_person)
            id_persona=data_person["id_persona"]
            cedula_persona=data_person["cedula_persona"]
            nombres_persona=data_person["nombres_persona"]
            apellidos_persona=data_person["apellidos_persona"]
            ruta_foto_persona=data_person["ruta_foto_persona"]
            fecha_nacimiento_persona=data_person["fecha_nacimiento_persona"]
            estado_persona=data_person["estado_persona"]
            id_usuario=data_person["id_usuario"]


            if(Model_Persona.objects.filter(id_persona=id_persona,cedula_persona=cedula_persona).exists() or not Model_Persona.objects.filter(cedula_persona=cedula_persona).exists()):
                
                person=get_object_or_404(Model_Persona,id_persona=id_persona)
                user=get_object_or_404(Model_Usuario,id_usuario=id_usuario_session)

                person.cedula_persona=cedula_persona
                person.nombres_persona=nombres_persona
                person.apellidos_persona=apellidos_persona
                person.fecha_nacimiento_persona=fecha_nacimiento_persona
                person.estado_persona=estado_persona
                person.id_usuario=user

                if ruta_foto_persona:
                    person.ruta_foto_persona=ruta_foto_persona
                print(cedula_persona)

                person.save()

                #seria_persona.save()
                return Response(dic_data_success,status=status.HTTP_201_CREATED)
            
            else:
                errors_messages.append("Ya existe una persona con la cedula {0}".format(cedula_persona))
                return Response(array_errors(errors_messages), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            print(e)
            return Response(array_errors[MESSAGE_ERROR_SERVIDOR], status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("2")
        return Response(array_errors[MESSAGE_SOLICITUD_NO_SOPORTADA],status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def desactivar_persona(request):

    errors_messages=[]

    if request.method == 'POST':
        try:
            data_person=request.data
            id_persona=data_person["id_persona"]
            person=get_object_or_404(Model_Persona,id_persona=id_persona)

            person.estado_persona=False
            person.save()
            return Response(dic_data_success,status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e," ddd")
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtener_persona_por_id(request):

    errors_messages=[]

    if request.method == 'POST':
        try:
            data_person=request.data
            id_persona=data_person["id_persona"]
            print(id_persona)
            print(request.user.id_usuario)
            person=Model_Persona.objects.filter(id_persona=id_persona)
            person_serializable=Serializer_Persona(person,many=True)
            return Response(person_serializable.data,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def listar_personas_por_usuario(request):

    errors_messages=[]

    if request.method == 'POST':
        try:
            id_usuario_session=request.user.id_usuario
            person=Model_Persona.objects.filter(id_usuario=id_usuario_session)
            person_serializable=Serializer_Persona(person,many=True)
            return Response(person_serializable.data,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def listar_usuarios(request):
    if request.method == 'GET':
        try:
            usuarios=Model_Usuario.objects.values("id_usuario","first_name","last_name","cedula_usuario","username","email","is_active","ruta_foto_usuario").all()
            print(usuarios)
            seria_usuario=Serializer_Usuario_LIST(usuarios, many=True)
            
            return Response(seria_usuario.data,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(array_errors[MESSAGE_ERROR_SERVIDOR], status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("2")
        return Response(array_errors[MESSAGE_SOLICITUD_NO_SOPORTADA],status=status.HTTP_406_NOT_ACCEPTABLE)
    



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def recursos_galeria(request):

    print(request.data)
    errors_messages=[]

    if request.method == 'POST':

        try:
            data=request.data
            id_galeria=data["id_galeria"]
            id_persona=data["id_persona"]
            tipo_recurso=data["tipo_recurso"]
            descripcion=request.POST.getlist("descripcion")
            recurso=request.data.getlist("recurso")

            longitud_data=len(descripcion)
            print(recurso)
            #
            id_usuario_session=request.user.id_usuario
            person=get_object_or_404(Model_Persona,id_persona=id_persona)
            user=get_object_or_404(Model_Usuario,id_usuario=id_usuario_session)
            galeria_model=get_object_or_404(Model_Galeria,id_galeria=id_galeria)
            tipo_recurso_model=get_object_or_404(Model_Tipo_Recurso,id_tipo_recurso=tipo_recurso)

            for x in range(longitud_data):
                print(recurso[x])
                recurso_galeria=Model_Recursos_Galeria(
                    id_galeria= galeria_model,
                    id_recurso= tipo_recurso_model,
                    id_persona= person,
                    id_usuario= user,
                    descripcion_recurso_galeria= descripcion[x],
                    ruta_recurso= recurso[x]
                )
                recurso_galeria.save()
            

        #seria_persona=Serializer_Persona(data=request.data)
        
        #if seria_persona.is_valid():
            #seria_persona.save()
            return Response(dic_data_success,status=status.HTTP_201_CREATED)
        #else:
        #    print(seria_persona.errors)
        #    print(seria_persona.is_valid())
        #    print(seria_persona.data)

        #    for key,values in seria_persona.errors.items():
        #        print(values[0])
        #        errors_messages.append(values[0])

        #    return Response(array_errors(errors_messages), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_406_NOT_ACCEPTABLE)

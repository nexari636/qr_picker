from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from qr_picker.serializador.seria_usuario import *
from qr_picker.serializador.seria_recursos_galeria import *
from qr_picker.serializador.seria_galeria import *
from qr_picker.serializador.seria_estudios import *
from qr_picker.serializador.seria_intereses import *
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


from django.core.files.images import ImageFile
from qr_picker.utils.create_qr import crear_qr
import io

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
                return Response(dic_data_success,status=status.HTTP_200_OK)
            else:
                print(seria_usuario.errors)

                for key,values in seria_usuario.errors.items():
                    print(values[0])
                    errors_messages.append(values[0])

                return Response(array_errors(errors_messages), status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)
    

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
                },status=status.HTTP_200_OK)
            else:
                return Response({
                    "error": "El usuario no existe o la contraseña es incorrecta"
                },status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)
    

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
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
#@authentication_classes([TokenAuthentication])
#@permission_classes([IsAuthenticated])
def update_password(request):
    if request.method == 'POST':
        try:
            print(request.data)
            diccionario_peticion=request.data
            usuario=diccionario_peticion["usuario"]
            password=diccionario_peticion["contrasenia"]
            user=get_object_or_404(Model_Usuario,username=usuario)
            user.password=password
            user.save()
            return Response(dic_data_success,status=status.HTTP_200_OK)
   
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)



from django.http import QueryDict
from django.http.request import QueryDict, MultiValueDict

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def guardar_persona(request):

    errors_messages=[]

    if request.method == 'POST':
        try:
            id_usuario_session=request.user.id_usuario
            #user=get_object_or_404(Model_Usuario,id_usuario=id_usuario_session)
       
            #print(request.data)
            diccionario_peticion=request.data.dict()
            querydic = QueryDict("", mutable=True)
            dictionary = {
                'cedula_persona': [diccionario_peticion['cedula_persona']],
                'nombres_persona': [diccionario_peticion['nombres_persona']],
                'apellidos_persona': [diccionario_peticion['apellidos_persona']],
                'fecha_nacimiento_persona': [diccionario_peticion['fecha_nacimiento_persona']],
                'id_usuario': [id_usuario_session],
                'ruta_foto_persona': [diccionario_peticion["ruta_foto_persona"]],
                'descripcion_destacada': [diccionario_peticion["descripcion_destacada"] if 'descripcion_destacada' in  diccionario_peticion else None],
                'telefono_persona': [diccionario_peticion["telefono_persona"] if 'telefono_persona' in  diccionario_peticion else None],
                'correo_persona': [diccionario_peticion["correo_persona"] if 'correo_persona' in  diccionario_peticion else None],
                'fecha_destacada': [diccionario_peticion["fecha_destacada"] if 'fecha_destacada' in  diccionario_peticion else None]
            }

            querydic.update(MultiValueDict(dictionary))

            print(querydic)

            seria_persona=Serializer_Persona(data=querydic)
            
            if seria_persona.is_valid():
                seria_persona.save()
                return Response(dic_data_success,status=status.HTTP_200_OK)
            else:
                print(seria_persona.errors)
                print(seria_persona.is_valid())
                print(seria_persona.data)

                for key,values in seria_persona.errors.items():
                    print(values[0])
                    errors_messages.append(values[0])

                return Response(array_errors(errors_messages), status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)

   
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


            if(Model_Persona.objects.filter(id_persona=id_persona,cedula_persona=cedula_persona).exists() or not Model_Persona.objects.filter(cedula_persona=cedula_persona).exists()):
                
                person=get_object_or_404(Model_Persona,id_persona=id_persona)
                user=get_object_or_404(Model_Usuario,id_usuario=id_usuario_session)

                person.cedula_persona=cedula_persona
                person.nombres_persona=nombres_persona
                person.apellidos_persona=apellidos_persona
                person.fecha_nacimiento_persona=fecha_nacimiento_persona
                person.estado_persona=estado_persona
                person.id_usuario=user

                if ruta_foto_persona!='null':
                    person.ruta_foto_persona=ruta_foto_persona
                print(cedula_persona)

                person.save()

                #seria_persona.save()
                return Response(dic_data_success,status=status.HTTP_200_OK)
            
            else:
                errors_messages.append("Ya existe una persona con la cedula {0}".format(cedula_persona))
                return Response(array_errors(errors_messages), status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)


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
            return Response(dic_data_success,status=status.HTTP_200_OK)
        except Exception as e:
            print(e," ddd")
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)


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
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)


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
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)


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
            return Response(array_errors[MESSAGE_ERROR_SERVIDOR], status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors[MESSAGE_SOLICITUD_NO_SOPORTADA],status=status.HTTP_400_BAD_REQUEST)
    

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
            tipo_recurso=request.POST.getlist("tipo_recurso")
            print(tipo_recurso)
            descripcion=request.POST.getlist("descripcion")
            recurso=request.data.getlist("recurso")

            if id_galeria and len(tipo_recurso)>0 and len(descripcion)>0 and len(recurso)>0:

                longitud_data=len(descripcion)
                print(recurso)
                #
                galeria_model=get_object_or_404(Model_Galeria,id_galeria=id_galeria)
                

                for x in range(longitud_data):

                    tipo_recurso_model=get_object_or_404(Model_Tipo_Recurso,id_tipo_recurso=tipo_recurso[x])
                   
                    print(recurso[x])
                    recurso_galeria=Model_Recursos_Galeria(
                        id_galeria= galeria_model,
                        id_tipo_recurso= tipo_recurso_model,
                        descripcion_recurso_galeria= descripcion[x],
                        ruta_recurso= recurso[x]
                    )
                    recurso_galeria.save()
            
                return Response(dic_data_success,status=status.HTTP_200_OK)
            else:
                return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def listar_recurso_galeria(request):
    if request.method == 'GET':
        try:
            print(request.GET)
            id_galeria=request.GET["id_galeria"]
          
            recursos_galeria=Model_Recursos_Galeria.objects.filter(id_galeria=id_galeria)
            
            seria_usuario=Serializer_Recursos_Galeria(recursos_galeria, many=True)
            
            return Response(seria_usuario.data,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)
    

from django.core.files.uploadedfile import InMemoryUploadedFile
import sys

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def guardar_galeria(request):

    errors_messages=[]
    print(request.data)
    if request.method == 'POST':
        try:

            id_usuario_session=request.user.id_usuario
            #user=get_object_or_404(Model_Usuario,id_usuario=id_usuario_session)

            diccionario_peticion=request.data.dict()

            querydic = QueryDict("", mutable=True)
            dictionary = {
                'id_persona': [diccionario_peticion['id_persona']],
                'nombre_galeria': [diccionario_peticion['nombre_galeria']],
                'descripcion_galeria': [diccionario_peticion['descripcion_galeria']],
                'id_usuario': [id_usuario_session]
            }

            querydic.update(MultiValueDict(dictionary))
            print(querydic)
            seria_galeria=Serializer_Galeria(data=querydic)
            
            if seria_galeria.is_valid():
                galeria_save=seria_galeria.save()
                buffer=crear_qr({
                    "id_galeria": galeria_save.id_galeria,
                    "id_persona": galeria_save.id_persona.id_persona,
                    "nombre_galeria":galeria_save.nombre_galeria,
                    "estado": galeria_save.estado_galeria
                })
                image = ImageFile(buffer, name='qr.svg')
                #print(seria_galeria.validated_data)
                print(galeria_save)
                galeria_save.ruta_qr=image
                galeria_save.save()
                return Response(dic_data_success,status=status.HTTP_200_OK)
            else:
                print(seria_galeria.errors)
                print(seria_galeria.is_valid())
                print(seria_galeria.data)

                for key,values in seria_galeria.errors.items():
                    print(values[0])
                    errors_messages.append(values[0])

                return Response(array_errors(errors_messages), status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def listar_galerias(request):
    if request.method == 'GET':
        try:
            print(request.GET)
            id_persona=request.GET["id_persona"]
            print(id_persona)
            id_usuario_session=request.user.id_usuario
          
            galerias=Model_Galeria.objects.filter(id_usuario=id_usuario_session,id_persona=id_persona)
            seria_galeria=Serializer_Galeria_LIST(galerias, many=True)
            
            return Response(seria_galeria.data,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def desactivar_galeria(request):

    errors_messages=[]
    if request.method == 'GET':
        
        print("golkasbnj")
        try:
            data_galeria=request.GET
            id_galeria=data_galeria.get("id_galeria")
            print(data_galeria)
            galeria=get_object_or_404(Model_Galeria,id_galeria=id_galeria)

            galeria.estado_galeria=False
            galeria.save()
            return Response(dic_data_success,status=status.HTTP_200_OK)
        except Exception as e:
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtener_galeria_by_id(request):
    errors_messages=[]
    if request.method == 'GET':
        try:
            data_galeria=request.GET
            print(data_galeria)
            id_galeria=data_galeria.get("id_galeria")
            print(id_galeria)
            galeria=get_object_or_404(Model_Galeria,id_galeria=id_galeria)
            seria_galeria=Serializer_Galeria_LIST(galeria)
            return Response(seria_galeria.data,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_galeria(request):
    errors_messages=[]
    if request.method == 'POST':
        try:
            id_usuario_session=request.user.id_usuario
            print(request.data)
            diccionario_peticion=request.data
            print("setso: "+diccionario_peticion["id_galeria"])

            id_persona=diccionario_peticion["id_persona"]
            id_galeria=diccionario_peticion["id_galeria"]
            nombre_galeria=diccionario_peticion["nombre_galeria"]
            descripcion_galeria=diccionario_peticion["descripcion_galeria"]

            seria_galeria=Serializer_Galeria(data=diccionario_peticion)

            if(id_persona!="" and nombre_galeria!="" and descripcion_galeria!=""  and id_galeria!=""):
                galeria=get_object_or_404(Model_Galeria,id_galeria=id_galeria)
                person=get_object_or_404(Model_Persona,id_persona=id_persona) 

                galeria.id_persona=person
                galeria.nombre_galeria=nombre_galeria
                galeria.descripcion_galeria=descripcion_galeria
                galeria.save()
                return Response(dic_data_success,status=status.HTTP_200_OK)
            else:
            
                return Response(array_errors(["Error campos vacios"]), status=status.HTTP_400_BAD_REQUEST) 

            #galeria=get_object_or_404(Model_Galeria,id_galeria=id_galeria) 
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)




#estudios

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_estudios(request):
    errors_messages=[]
    if request.method == 'POST':
        try:

            diccionario_peticion=request.data
            print(diccionario_peticion)
            seria_galeria=Serializer_Estudios(data=diccionario_peticion)

            if(seria_galeria.is_valid()):
                seria_galeria.save()
                return Response(dic_data_success,status=status.HTTP_200_OK)
            else:
                for key,values in seria_galeria.errors.items():
                    print(values[0])
                    errors_messages.append(values[0])

                return Response(array_errors(errors_messages), status=status.HTTP_400_BAD_REQUEST)
        
            #galeria=get_object_or_404(Model_Galeria,id_galeria=id_galeria) 
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def desactivar_estudios(request):
    errors_messages=[]
    if request.method == 'GET':
        try:

            data_estudio=request.GET
            id_estudio=data_estudio.get("id_estudio")

            estudio=get_object_or_404(Model_Estudio,id_estudio=id_estudio)
            estudio.estado_estudio=False
            estudio.save()
            return Response(dic_data_success,status=status.HTTP_200_OK)        
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def listar_estudios(request):
    errors_messages=[]
    if request.method == 'GET':
        try:

            data_estudio=request.GET
            id_persona=data_estudio.get("id_persona")

            estudios=Model_Estudio.objects.filter(id_persona=id_persona)
            seria_estudio=Serializer_Estudios(estudios,many=True)
            
            return Response(seria_estudio.data,status=status.HTTP_200_OK)        
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_estudios(request):
    errors_messages=[]
    if request.method == 'POST':
        try:

            diccionario_peticion=request.data
            print(diccionario_peticion)

            id_estudio=diccionario_peticion["id_estudio"]
            id_persona=diccionario_peticion["id_persona"]
            estudio=diccionario_peticion["estudio"]
            descripcion_estudio=diccionario_peticion["descripcion_estudio"]
            fecha_inicio=diccionario_peticion["fecha_inicio"]
            fecha_fin=diccionario_peticion["fecha_fin"]

            if(id_estudio!="" and id_persona!="" and estudio!="" and descripcion_estudio!="" and fecha_inicio!="" and fecha_fin!=""):
                
                estudio_model=get_object_or_404(Model_Estudio,id_estudio=id_estudio)
                person=get_object_or_404(Model_Persona,id_persona=id_persona) 

                estudio_model.id_persona=person
                estudio_model.estudio=estudio
                estudio_model.descripcion_estudio=descripcion_estudio
                estudio_model.fecha_inicio=fecha_inicio
                estudio_model.fecha_fin=fecha_fin

                estudio_model.save()
                return Response(dic_data_success,status=status.HTTP_200_OK)
            else:
               
                return Response(array_errors(["Error campos vacios"]), status=status.HTTP_400_BAD_REQUEST)
        
            #galeria=get_object_or_404(Model_Galeria,id_galeria=id_galeria) 
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtener_estudio_by_id(request):
    errors_messages=[]
    if request.method == 'GET':
        try:
            data_estudio=request.GET
            print(data_estudio)
            id_estudio=data_estudio.get("id_estudio")
            print(id_estudio)
            estudio=get_object_or_404(Model_Estudio,id_estudio=id_estudio)
            seria_estudio=Serializer_Estudios(estudio)
            return Response(seria_estudio.data,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)







#Intereses

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_intereses(request):
    errors_messages=[]
    if request.method == 'POST':
        try:

            diccionario_peticion=request.data
            print(diccionario_peticion)
            seria_intereses=Serializer_Intereses(data=diccionario_peticion)

            if(seria_intereses.is_valid()):
                seria_intereses.save()
                return Response(dic_data_success,status=status.HTTP_200_OK)
            else:
                for key,values in seria_intereses.errors.items():
                    print(values[0])
                    errors_messages.append(values[0])

                return Response(array_errors(errors_messages), status=status.HTTP_400_BAD_REQUEST)
        
            #galeria=get_object_or_404(Model_Galeria,id_galeria=id_galeria) 
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def desactivar_intereses(request):
    errors_messages=[]
    if request.method == 'GET':
        try:

            data_interes=request.GET
            id_interes=data_interes.get("id_interes")

            interes=get_object_or_404(Model_Interes,id_interes=id_interes)
            interes.estado_interes=False
            interes.save()
            return Response(dic_data_success,status=status.HTTP_200_OK)        
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def listar_intereses(request):
    errors_messages=[]
    if request.method == 'GET':
        try:

            data_interes=request.GET
            id_persona=data_interes.get("id_persona")

            interes=Model_Interes.objects.filter(id_persona=id_persona)
            seria_estudio=Serializer_Intereses(interes,many=True)
            
            return Response(seria_estudio.data,status=status.HTTP_200_OK)        
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_intereses(request):
    errors_messages=[]
    if request.method == 'POST':
        try:

            diccionario_peticion=request.data
            print(diccionario_peticion)

            id_interes=diccionario_peticion["id_interes"]
            id_persona=diccionario_peticion["id_persona"]
            interes=diccionario_peticion["interes"]
            descripcion_interes=diccionario_peticion["descripcion_interes"]
       

            if(id_interes!="" and id_persona!="" and interes!="" and descripcion_interes!=""):
                
                interes_model=get_object_or_404(Model_Interes,id_interes=id_interes)
                person=get_object_or_404(Model_Persona,id_persona=id_persona) 

                interes_model.id_persona=person
                interes_model.interes=interes
                interes_model.descripcion_interes=descripcion_interes
            
                interes_model.save()
                return Response(dic_data_success,status=status.HTTP_200_OK)
            else:
                
                return Response(array_errors(["Error campos vacios"]), status=status.HTTP_400_BAD_REQUEST)
        
            #galeria=get_object_or_404(Model_Galeria,id_galeria=id_galeria) 
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtener_interes_by_id(request):
    errors_messages=[]
    if request.method == 'GET':
        try:
            data_interes=request.GET
            print(data_interes)
            id_interes=data_interes.get("id_interes")
            print(id_interes)
            interes=get_object_or_404(Model_Interes,id_interes=id_interes)
            seria_interes=Serializer_Intereses(interes)
            return Response(seria_interes.data,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)





#android

@api_view(['POST'])
#@authentication_classes([TokenAuthentication])
#@permission_classes([IsAuthenticated])
def listar_galerias_persona_android(request):
    if request.method == 'POST':
        try:
            print(request.POST)
            id_persona=request.POST["id_persona"]
            print(id_persona)

            
            galerias=Model_Galeria.objects.filter(id_persona=id_persona,estado_galeria=True)
            seria_galeria=Serializer_Galeria_LIST(galerias, many=True)
            diccionario_galeria=seria_galeria.data
            for galeria in diccionario_galeria:
                recursos_galeria=Model_Recursos_Galeria.objects.filter(id_galeria=galeria["id_galeria"])
                serializable_recurso_galeria=Serializer_Recursos_Galeria(recursos_galeria,many=True)
                galeria["recursos_galeria"]=serializable_recurso_galeria.data
                print(serializable_recurso_galeria.data)

            persona=get_object_or_404(Model_Persona,id_persona=id_persona)
                
                
            estudios=Model_Estudio.objects.filter(id_persona=id_persona)
            intereses=Model_Interes.objects.filter(id_persona=id_persona)

            serializable_person=Serializer_Persona(persona)
            serializable_estudios=Serializer_Estudios(estudios,many=True)
            serializable_intereses=Serializer_Intereses(intereses,many=True)

            data_galeria_person=serializable_person.data
            data_galeria_person["estudios"]=serializable_estudios.data
            data_galeria_person["intereses"]=serializable_intereses.data
            data_galeria_person["galerias"]=diccionario_galeria

            return Response(data_galeria_person,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(array_errors([MESSAGE_ERROR_SERVIDOR]), status=status.HTTP_400_BAD_REQUEST)
    else:
        print("2")
        return Response(array_errors([MESSAGE_SOLICITUD_NO_SOPORTADA]),status=status.HTTP_400_BAD_REQUEST)
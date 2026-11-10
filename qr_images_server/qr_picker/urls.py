from django.contrib import admin
from django.urls import path,include
from qr_picker.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('create_user/', guardar_usuario,name="create_user"),
    path('login/', login,name="login"),
    path('logout/', logout,name="logout"),
    path('create_person/', guardar_persona,name="create_person"),
    path('list_users/', listar_usuarios,name="list_users"),
    path('update_person/', actualizar_persona,name="update_person"),
    path('desactivate_person/',desactivar_persona,name='desactivate_person'),
    path('get_person_id/',obtener_persona_por_id,name='get_person_id'),
    path('list_persona_usuario/',listar_personas_por_usuario,name='list_persona_usuario'),
    path('gallery_resource/',recursos_galeria,name='gallery_resource'),
    path('list_gallery_resource/',listar_recurso_galeria,name='list_gallery_resource'),
    path('create_gallery/',guardar_galeria,name='create_gallery'),
    path('list_gallery/',listar_galerias,name='list_gallery'),
    path('desactivate_gallery/',desactivar_galeria,name='desactivate_gallery'),
    path('list_gallery_android/',listar_galerias_persona_android,name='list_gallery_android'),
    path('update_gallery/',actualizar_galeria,name='update_gallery'),
    path('get_gallery_by_id/',obtener_galeria_by_id,name='get_gallery_by_id'),
    path('create_estudios/',crear_estudios,name='create_estudios'),
    path('desactivate_estudios/',desactivar_estudios,name='desactivate_estudios'),
    path('list_estudios/',listar_estudios,name='list_estudios'),
    path('update_estudios/',actualizar_estudios,name='update_estudios'),
    path('create_intereses/',crear_intereses,name='create_intereses'),
    path('desactivate_intereses/',desactivar_intereses,name='desactivate_intereses'),
    path('list_intereses/',listar_intereses,name='list_intereses'),
    path('update_intereses/',actualizar_intereses,name='update_intereses'),
    path('get_estudio_by_id/',obtener_estudio_by_id,name='get_estudio_by_id'),
    path('get_interes_by_id/',obtener_interes_by_id,name='get_interes_by_id'),
    path('update_password/',update_password,name='update_password'),

]

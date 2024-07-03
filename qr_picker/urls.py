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
]

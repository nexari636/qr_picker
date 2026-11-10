# Plataforma de Gestion de Perfiles y Galerias QR

Aplicación para la creación y administración de perfiles personales, galerías multimedia y códigos QR. Está compuesta por una API backend para gestionar la información, un panel web de administración y una aplicación nativa para Android que permite visualizar los perfiles y su contenido desde dispositivos móviles.

---

## Estructura del Sistema

El proyecto esta dividido en tres partes principales:

1. **Backend (`qr_images_server`)**
   - API REST desarrollada con Django y Django REST Framework.
   - Maneja la autenticacion mediante tokens, el almacenamiento de perfiles de personas, galerias de imagenes, registros academicos (estudios) e intereses personales.
   - Incluye la logica para generar codigos QR asociados a cada galeria.

2. **Frontend Web (`qr_picker_view`)**
   - Panel de control web construido en Angular utilizando componentes standalone y PrimeNG.
   - Interfaz para que los usuarios registrados puedan dar de alta perfiles, cargar fotografias, administrar galerias y actualizar informacion de forma rapida.

3. **Aplicacion Movil (`qrapp`)**
   - Cliente movil nativo para Android desarrollado en Kotlin.
   - Permite escanear codigos QR para consultar de manera directa la informacion detallada del perfil, visualizar la fotografia, fechas destacadas, galerias, estudios e intereses.

---

## Stack Tecnologico

- **Backend:** Python, Django, Django REST Framework, SQLite/PostgreSQL.
- **Frontend Web:** Angular (TypeScript, Reactive Forms, PrimeNG, Bootstrap).
- **Movil:** Android (Kotlin, Jetpack, Picasso, Gson).

---

## Modelo de Datos Principal

- **Personas:** Informacion general de identidad (cedula, nombres, apellidos, fotografia, fecha y descripcion destacada, datos de contacto).
- **Galerias:** Agrupaciones multimedia vinculadas a cada perfil con su respectivo codigo QR.
- **Estudios:** Historial de formacion academica.
- **Intereses:** Pasatiempos, aficiones o areas de interes personal.

---

## Puesta en Marcha

### 1. Servidor Backend
```bash
cd qr_images_server
python -m venv venv
# Activar el entorno virtual segun el sistema operativo
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2. Panel Web Angular
```bash
cd qr_picker_view
npm install
ng serve
```

### 3. Aplicacion Movil Android
- Abrir el directorio `qrapp` en Android Studio.
- Verificar la configuracion de conexion al servidor en `UrlAPI.kt` y ejecutar en un dispositivo o emulador.

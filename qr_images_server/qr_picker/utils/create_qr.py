import qrcode
import qrcode.image.svg
from qr_images_server.settings import MEDIA_ROOT
import os,io



def crear_qr(data):

    """ Parametro data recibe un diccionario de valores con id_galeria, id_persona, nombre_galeria, estado """

    qr = qrcode.QRCode(
        version=3,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=50,
        border=4,
        image_factory=qrcode.image.svg.SvgPathImage
    )


    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(back_color=(0, 0, 0), fill_color=(255, 255, 255))

    #img.save(os.path.join(MEDIA_ROOT, 'qrs',"{uuid}.svg".format(uuid.uuid4)))
    #crear un buffer para escribir la imagen svg en ese buffer :V
    buffer = io.BytesIO()
    img.save(buffer)
    value_buffer=buffer.getvalue()
    print("se va a generar el buffer de codigo qr en svg")
    print(value_buffer)
    buffer.close()
    
    return io.BytesIO(value_buffer)


def prueba():

    qr = qrcode.QRCode(
        version=3,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=50,
        border=4,
        image_factory=qrcode.image.svg.SvgPathImage
    )

    data={}

    data["nombre"]='sdfsdf'
    data["apellido"]='dfsd'
    data["edad"]='edad'
    data["dsf"]='edad'
    data["edfssdfdfdad"]='edad'
    data["edsdfdfdfdad"]='edad'

    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(back_color=(0, 0, 0), fill_color=(255, 255, 255))
    buffer = io.BytesIO()
    img.save(buffer)
    value_buffer=buffer.getvalue()
    print(value_buffer)
    #img.save("ruta")
    buffer.close()
    return value_buffer


import json


MESSAGE_ERROR_SERVIDOR="Ha ocurrido un error en el servidor"
MESSAGE_SOLICITUD_NO_SOPORTADA="Ha ocurrido un error en el servidor"


dic_data_success={
    "success":"La operacion se completo exitosamente",
    "status":"1"
}

def array_errors(errors_messages):
    error_dic={}
    error_dic["errors"]=errors_messages
    error_dic["status"]=-1
    return error_dic

def dic_to_json_convert(datos_dic):
    return json.dumps(datos_dic)



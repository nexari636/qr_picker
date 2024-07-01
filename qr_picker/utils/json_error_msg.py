import json

dic_data={
    "error":"Ha ocurrido un error en el servidor",
    "status":"-1"
}

dic_data_error_solicitud={
    "error":"Solicitud no soportada",
    "status":"-1"
}

dic_data_error_campos_faltantes={
    "error":"Existen campos vacios",
    "status":"-1"
}

dic_data_success={
    "success":"La operacion se completo exitosamente",
    "status":"1"
}



def dic_to_json_convert(datos_dic):
    return json.dumps(datos_dic)



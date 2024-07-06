
export class GetFile
{
    file: any;
    event: any;
    file_base64: any;
    tipo: string;
    status: boolean;
    
    
    constructor(event:any)
    {
        this.tipo="";
        this.status=false;
        if(event!=null){
            this.file=event.target.files[0];
            this.event=event;
            this.asignar_base_64();
            console.log(this.file);
            this.tipo=this.file.type;
            this.status=true;
            //console.log(this.tipo);
        }
    }


    async get_base64():Promise<any>
    {
        return new Promise((resolve,reject)=>{
            const reader = new FileReader()
            reader.readAsDataURL(this.file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (e) => reject(e)
        });
    }

    asignar_base_64(){
        this.get_base64().then(data=>{
            this.file_base64=data
        });
    }



}

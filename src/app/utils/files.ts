
export class GetFile
{
    file: any
    event: any
    
    constructor(event:any)
    {
        this.file=event.target.files[0];
        this.event=event;
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


}

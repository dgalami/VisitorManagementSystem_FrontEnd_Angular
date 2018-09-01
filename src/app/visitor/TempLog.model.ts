
export class TempLog{
    logId:number;
    logDate:string;
    logInTime:string;
    logOutTime:string;
    reason: string;
    visitorsId:any[];
    eId:Number;
    checkedIn:boolean = false;

    constructor(){
        this.visitorsId = [];
    }
}

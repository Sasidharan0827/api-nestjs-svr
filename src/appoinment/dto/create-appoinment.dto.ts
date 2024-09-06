import { Consultation } from "src/consultation/entities/consultation.entity"
import { Doctor } from "src/doctor/entities/doctor.entity"
import { User } from "src/users/entities/user.entity"

export class CreateAppoinmentDto {
   
 
    date?:string;
    
    
    userId?:number;
    con_id?:number;
  
   
   
}
 
//  export class AppointmentDto{
//     app:CreateAppoinmentDto[]
//  }
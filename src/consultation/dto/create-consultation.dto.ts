import { Doctor } from "src/doctor/entities/doctor.entity";

export class CreateConsultationDto {
 
    
    day?:string;
   
   session?:string;
   
  
    start_time?:string;
    end_time?:string;
    doc_id?:number;
    
}

export class CreateConsultationsDto {
    data: CreateConsultationDto[];
}
export class UpdatedConsultationDto {
    con_id: number;
    day?: string;
    session?: string;
    start_time?: string;
    end_time?: string;
 
  }
  
  export class UpdateConsultationsDto {
    data: UpdatedConsultationDto[];
  }
import { Appoinment } from "src/appoinment/entities/appoinment.entity";
import { Doctor } from "src/doctor/entities/doctor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Consultation {
    @PrimaryGeneratedColumn()
    con_id:number;
 
    @Column()
    day:string;
    @Column()
    session:string;
    
    @Column()
    start_time:string;
    @Column()
    end_time:string;

    @Column({ name: 'doc_id' })
    doc_id:number;
   
     @ManyToOne(() => Doctor)
     @JoinColumn({ name: 'doc_id' }) 
     doctor: Doctor;
  
  

    
 @OneToMany(() => Appoinment, (x:Appoinment) => x.consultaion)
 Appoinment:Appoinment []
  
}

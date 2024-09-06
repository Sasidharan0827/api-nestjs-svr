import { Consultation } from "src/consultation/entities/consultation.entity";
import { Doctor } from "src/doctor/entities/doctor.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Appoinment {
    @PrimaryGeneratedColumn()
    id:number
  
  
  
    @Column({ name: 'userId' })
    userId:number

    @Column({ name: 'con_Id' })
    con_id:number

    @Column()
    date:string



   
       
 @ManyToOne(() => User)
 @JoinColumn({ name: 'userId' })
 user: User;


@ManyToOne(() => Consultation)
@JoinColumn({name:'con_Id'})
consultaion: Consultation;
}


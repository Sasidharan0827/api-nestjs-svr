import { Appoinment } from "src/appoinment/entities/appoinment.entity";
import { Doctor } from "src/doctor/entities/doctor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  


    @Column()
    name:string;

    
    @Column()
    dob:string;

    @Column()
    address:string;
    
    @Column()
    emailId:string;

    @Column()
    password:string;

    
    @Column()
    phone:string;

    @OneToMany(() => Appoinment, (x:Appoinment) => x.user)
    Appoinment:Appoinment[]

   
}

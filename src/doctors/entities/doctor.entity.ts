import { Consultation } from "src/consultations/entities/consultation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string;

    @Column()
    emailId:string;

    @Column()
    speciality:string 

    @Column()
    hash:string;

    @OneToMany(() => Consultation, (x:Consultation) => x.doctor)
    consultations: Consultation[]

}

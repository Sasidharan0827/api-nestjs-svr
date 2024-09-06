import { Doctor } from "src/doctors/entities/doctor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Consultation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    doctorId:number;

    @ManyToOne(() => Doctor, (x) => x.consultations)
    doctor: Doctor

    @Column()
    day:string;

    @Column()
    sessionType:string;

    @Column()
    startTime:string;

    @Column()
    endTime:string;

}

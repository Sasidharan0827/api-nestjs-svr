import { IsNumber, IsOptional } from "class-validator";
import { Appoinment } from "src/appoinment/entities/appoinment.entity";
import { Consultation } from "src/consultation/entities/consultation.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Doctor {
@PrimaryGeneratedColumn()
doc_id:number;
 
@Column()
docname:string;

@Column()
dob:string;

@Column()
address:string;

@Column()
education:string;



@Column()
specalist:string;

@Column()
    docemailId:string;
    
    @Column()
    phonenumber:string;

@Column()
 docpassword:string;
 
 @OneToMany(() => Consultation, (x:Consultation) => x.doctor)
 consultations: Consultation[]


 @Column({ nullable: true })
  photo?: string;
 

}

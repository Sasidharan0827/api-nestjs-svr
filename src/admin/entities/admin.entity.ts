import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    admin_name:string;

    @Column()
    admin_dob:string;

    @Column()
    admin_emailId:string;
     
    @Column()
    admin_password:string;

    @Column()
    admin_address:string;

    @Column()
    admin_phone:string;

   
}

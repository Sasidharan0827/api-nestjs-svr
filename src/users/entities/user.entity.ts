import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string;

    @Column()
    emailId:string;

    @Column()
    password:string;

    @Column()
    profile:number
}

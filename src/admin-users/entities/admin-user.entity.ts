import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string;

    @Column()
    emailId:string;

    @Column()
    hash:string;

}

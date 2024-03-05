import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('job_offers')
export class JobOffer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    position: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    employer_name: string

    @Column()
    state: string

    @Column()
    summary: string
}

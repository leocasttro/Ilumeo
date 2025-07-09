import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TimeEntry {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  code!: string

  @Column()
  startTime!: Date

  @Column({ nullable: true })
  endTime?: Date

  @Column({ default: 'entry' })
  type!: 'entry' | 'exit'
}
import { PrismaClient } from "@prisma/client"

export class EventsRepository {
    constructor() {
        this.prisma = new PrismaClient()
    }

    async createEvent({ title, local, dateStart }) {
        const event = await this.prisma.event.create({
            data: {
                title,
                local,
                dateStart
            }
        })

        return event
    }

    async getEvents() {
        const events = await this.prisma.event.findMany()
        return events
    }

    async updateEvent({ id, title, local, dateStart }) {
        const event = await this.prisma.event.update({
            where: {
                id
            },
            data: {
                title,
                local,
                dateStart
            }
        })

        return event
    }

    async deleteEvent(id) {
        await this.prisma.event.delete({ where: { id } })
    }
}

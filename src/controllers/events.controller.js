import { EventsRepository } from "../repositories/events.repository.js"

export class EventsController {
    static instance

    constructor() {
        this.repository = new EventsRepository()
    }

    getAllEvents = async (req, res) => {
        const allEvents = await this.repository.getEvents()
        return res.json(allEvents)
    }

    createEvent = async (req, res) => {
        const event = req.body

        const createdEvent = await this.repository.createEvent(event)

        return res.json(createdEvent)
    }

    updateEvent = async (req, res) => {
        const id = Number(req.params.id)
        const event = req.body

        const eventUpdated = await this.repository.updateEvent({ id, ...event })

        return res.json(eventUpdated)
    }

    deleteEvent = async (req, res) => {
        const id = Number(req.params.id)

        await this.repository.deleteEvent(id)

        return res.json({ ok: true })
    }
}

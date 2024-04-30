import { Router } from 'express'
import { EventsController } from '../controllers/events.controller.js'

export const eventsRouter = Router()
const eventsController = new EventsController()

eventsRouter.get('/', eventsController.getAllEvents)
eventsRouter.post('/', eventsController.createEvent)
eventsRouter.patch('/:id', eventsController.updateEvent)
eventsRouter.delete('/:id', eventsController.deleteEvent)

const express = require('express');
const ideasRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// Get an array of all ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

// Create a new idea and save it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// Get a single idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
    const id = req.params.ideaId;
    const idea = getFromDatabaseById('ideas', id);

    if (idea) {
        res.send(idea);
    } else {
        res.status(404).send();
    }
});

// Update a single idea by id
ideasRouter.put('/:ideaId', (req, res, next) => {
    const id = req.params.ideaId;
    const ideaExists = getFromDatabaseById('ideas', id);

    if (ideaExists) {
        res.send(updateInstanceInDatabase('ideas', req.body));
    } else {
        res.status(404).send();
    }
});

// Delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const id = req.params.ideaId;
    const ideaExists = getFromDatabaseById('ideas', id);

    if(ideaExists) {
        res.status(204).send(deleteFromDatabasebyId('ideas', id));
    } else {
        res.status(404).send();
    }
});

module.exports = ideasRouter;

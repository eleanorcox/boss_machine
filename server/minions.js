const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

// TODO: Add router.param for repeated minionid code

// Get array of all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

// Create a new minion and save it to the database
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// Get a single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    const id = req.params.minionId;
    const minion = getFromDatabaseById('minions', id);

    if (minion) {
        res.send(minion);
    } else {
        res.status(404).send();
    }
});

// Update a single minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    const id = req.params.minionId;
    const minion = getFromDatabaseById('minions', id);

    if (minion) {
        res.send(updateInstanceInDatabase('minions', req.body));
    } else {
        res.status(404).send();
    }
});

// Delete a single minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const id = req.params.minionId;
    const minion = getFromDatabaseById('minions', id);

    if(minion) {
        res.status(204).send(deleteFromDatabasebyId('minions', id));
    } else {
        res.status(404).send();
    } 
});

// Get an array of all work for a specified minion
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const id = req.params.minionId;
    const minion = getFromDatabaseById('minions', id);
    const work = getAllFromDatabase('work').filter(workTemp => {
        if (workTemp.minionId === id) {
            return workTemp;
        } 
    })

    if (minion && work) {
        res.send(work);
    } else {
        res.status(404).send();
    }
});

// Create a new work object and save it to the database
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
});

// Update a single work by id
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    const minionId = req.params.minionId;
    const minion = getFromDatabaseById('minions', minionId);

    const workId = req.params.workId;
    const work = getFromDatabaseById('work', workId);

    const workToAdd = req.body;
    workToAdd.minionId = minionId;

    if (minion && work) {
        if (work.minionId !== minionId) {
            res.status(400).send();
        } else {
            res.send(updateInstanceInDatabase('work', workToAdd));
        }
    } else {
        res.status(404).send();
    }
});

// Delete a single work by id
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const minionId = req.params.minionId;
    const minion = getFromDatabaseById('minions', minionId);

    const workId = req.params.workId;
    const work = getFromDatabaseById('work', workId);

    if (minion && work) {
        if (work.minionId !== minionId) {
            res.status(400).send();
        } else {
            res.status(204).send(deleteFromDatabasebyId('work', workId));
        }
    } else {
        res.status(404).send();
    }
});

module.exports = minionsRouter;

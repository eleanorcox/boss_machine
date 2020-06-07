const checkMillionDollarIdea = (req, res, next) => {
    if (req.body.numWeeks && req.body.weeklyRevenue) {
        const ideaValue = req.body.numWeeks * req.body.weeklyRevenue;
        const millionDollarIdea = ideaValue >= 1000000;
        if (millionDollarIdea){
            next();
        } else {
            res.status(400).send();
        }
    } else {
        res.status(400).send();
    }


};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
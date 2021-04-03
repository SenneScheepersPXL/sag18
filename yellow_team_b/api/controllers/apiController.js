'use strict';

const accessTokenSecret = 'youraccesstokensecret';
const jwt = require('jsonwebtoken');

exports.list_all_members = function(req, res) {
    if (req.scope == "team" || req.scope == "admin")
        res.json({ names: "Senne, Mikkiel, Jeffrey, Mathias" });
    else
        res.sendStatus(401);
};


exports.read_a_poem = function(req, res) {
    if (req.scope == "admin")
        res.json({ poem: "Rozen zijn rood, Begin iedere dag met een ontbijt. Als ge m'n pet afpakt, Dan flip ik altijd." });
    else
        res.sendStatus(401);
};


exports.authorize = function(req, res) {
    const { secret, scope } = req.body;

    if (secret === "PXL") {
        const accessToken = jwt.sign({ scope: scope }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send("Not allowed");
    }
};

exports.authenticateJWT = function(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.scope = decoded.scope;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
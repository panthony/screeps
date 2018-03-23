const CONFIG = require('config');
const { roleOf } = require('creeps.utils');
const { harvesterHandler } = require('role.harvester');
const { upgraderHandler } = require('role.upgrader');
const { builderHandler } = require('role.builder');

const ROLE_HANDLERS = {
    [CONFIG.ROLE_HARVESTER]: harvesterHandler,
    [CONFIG.ROLE_BUILDER]: builderHandler,
    [CONFIG.ROLE_UPGRADER]: upgraderHandler
};

const { values } = Object;

/**
 * Handles day life of creeps.
 *
 * Make sure they stay busy.
 */
const creepsHandler = {
    run() {
        values(Game.creeps)
            .map((creep) => [ creep, ROLE_HANDLERS[roleOf(creep)] ])
            .filter(([ , handler ]) => handler)
            .forEach(([ creep, handler ]) => handler.run(creep));
    }
};

module.exports = creepsHandler;
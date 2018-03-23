const CONFIG = require('config');

const creepsManager = require('creeps.manager');
const creepsHandler = require('creeps.handler');
const towersHandler = require('towers.handler');

module.exports.loop = function () {

    const spawn = Game.spawns[CONFIG.MAIN_SPAWN];

    creepsManager.run(spawn, Game.creeps);
    creepsHandler.run();
    towersHandler.run();
};
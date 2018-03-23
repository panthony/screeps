const CONFIG = require('config');
const { count, tryCreateCreep } = require('creeps.utils');

const countUpgraders = () =>
    count(CONFIG.ROLE_UPGRADER);

const spawnUpgrader = () =>
    tryCreateCreep(Game.spawns[CONFIG.MAIN_SPAWN], CONFIG.BODY_SMALL_UPGRADER, CONFIG.ROLE_UPGRADER);

const upgraderHandler = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {

            // TODO: find the closest source
            const sources = creep.room.find(FIND_SOURCES);
            const source = sources[sources.length - 1];

            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = {
    countUpgraders,
    spawnUpgrader,
    upgraderHandler
};
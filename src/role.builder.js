const CONFIG = require('config');
const { count, tryCreateCreep } = require('creeps.utils');

const countBuilders = () =>
    count(CONFIG.ROLE_BUILDER);

const spawnBuilder = () =>
    tryCreateCreep(Game.spawns[CONFIG.MAIN_SPAWN], CONFIG.BODY_SMALL_BUILDER, CONFIG.ROLE_BUILDER);

/**
 * Describes what is going on in a little builder's head.
 */
const builderHandler = {

    run(creep) {

        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }

        if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            // TODO find closest stored(possible?) energy source
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = {
    countBuilders,
    spawnBuilder,
    builderHandler
};
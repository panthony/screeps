const CONFIG = require('config');

/**
 * Describe what is going on in a little harvester's head.
 *
 * It's main purpose is to gather energy then give it the spawn or nearby container
 */
const harvesterHandler = {

    run(creep) {

        if (!creep.memory.harvesting && creep.carry.energy === 0) {
            creep.memory.harvesting = true;
            creep.say('> Harvesting');
        }

        if (creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('< Storing');
        }

        if (creep.memory.harvesting) {

            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: CONFIG.COLOR_YELLOW } } );
            }
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                structure.structureType === STRUCTURE_SPAWN ||
                structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
        });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = {
    harvesterHandler
};
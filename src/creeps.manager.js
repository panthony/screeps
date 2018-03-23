const CONFIG = require('config');

const { spawnUpgrader } = require('role.upgrader');
const { spawnBuilder } = require('role.builder');

/**
 * Basically Creep's god.
 *
 * Manage life and death.
 */
const creepsManager = {
  run(spawn, creeps) {

    const countsPerRoles = creeps
        .reduce((state, creep) => {
            state[creep.memory.role]++;
            return state;
        }, {
            [CONFIG.ROLE_HARVESTER]: 0,
            [CONFIG.ROLE_UPGRADER]: 0,
            [CONFIG.ROLE_BUILDER]: 0
        });

    if (spawn.memory.maxHarvesters === undefined) {
      spawn.memory.maxHarvesters = CONFIG.MAX_HARVESTERS_PER_SOURCE * spawn.room.find(FIND_SOURCES).length;
    }

    if (countsPerRoles[CONFIG.ROLE_HARVESTER] < spawn.memory.maxHarvesters) {
      spawn.createCreep(CONFIG.BODY_SMALL_HARVESTER, undefined, { role: CONFIG.ROLE_HARVESTER });
    } else if (countsPerRoles[CONFIG.ROLE_UPGRADER] < CONFIG.MAX_UPGRADERS_COUNT) {
      spawnUpgrader();
    } else if (countsPerRoles[CONFIG.ROLE_BUILDER] < CONFIG.MAX_BUILDERS_COUNT) {
      spawnBuilder();
    }

  }
};

module.exports = creepsManager;
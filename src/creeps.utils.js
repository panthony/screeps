const { values } = Object;

const roleOf = (creep) =>
    creep.memory.role;

const listCreeps = (role = null) => {
    let creeps = values(Game.creeps);
    return role ? creeps.filter((creep) => roleOf(creep) === role) : creeps;
};

const count = (role = null) =>
    listCreeps(role)
        .length;

const findDyingCreep = (role = null) =>
    listCreeps(role)
        .sort((a, b) => a.ticksToLive - b.ticksToLive)
        [0];

const tryCreateCreep = (spawn, body, role) => {
    let result = spawn.createCreep(body, undefined, { role });
    if (result === OK) {
        Game.notify(`Created new ${role} creep.`);
    }
};

const assignRole = (creep, role) =>
    creep.memory.role = role;

const moveTo = (creep, target, { color }) =>
    creep.moveTo(target, { visualizePathStyle: { stroke: color }});

module.exports = {
    roleOf,
    moveTo,
    assignRole,
    listCreeps,
    count,
    findDyingCreep,
    tryCreateCreep
};
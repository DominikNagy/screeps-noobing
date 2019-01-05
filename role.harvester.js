/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function (creep) {
        // function when creepy is carrying energy
        if (_.sum(creep.carry) === 0) {
            creep.memory.isEmpty = true;
        }
        else if (_.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.isEmpty = false;
        }

        const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

        // harvest from source
        if (target && creep.memory.isEmpty === true) {
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // transfer to controller/spawn
        else {
            if (creep.memory.spawn === true) {
                if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Spawn1);
                }
            }
            else {
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
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
        const construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        // harvest from source
        if (target && creep.memory.isEmpty === true) {
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // transfer to building
        else {
            if (creep.build(construction) === ERR_NOT_IN_RANGE) {
                creep.moveTo(construction);
            }
        }
    }
};
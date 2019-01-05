/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */
var roleBuilder = require('role.builder');

module.exports = {
    run: function (creep) {
        // function when creepy is carrying energy
        if (_.sum(creep.carry) === 0) {
            creep.memory.isEmpty = true;
        }
        else if (_.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.isEmpty = false;
        }

        const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        const constructions = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });

        constructions.sort((a,b) => a.hits - b.hits);

        // harvest from source
        if (source && creep.memory.isEmpty === true) {
            //console.log("Repairer going for source!");
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        // transfer to building
        else {
            if(constructions.length > 0) {
                if(creep.repair(constructions[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructions[0]);
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }
    }
};
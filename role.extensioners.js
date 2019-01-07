/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleHarvester = require('role.harvester');

module.exports = {
    run: function (creep) {
        console.log("Running extensioners!");
        // function when creepy is carrying energy
        if (_.sum(creep.carry) === 0) {
            creep.memory.isEmpty = true;
        }
        else if (_.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.isEmpty = false;
        }

        const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        const extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });

        console.log(extensions[0].energyCapacity+" "+extensions[0].energy);
        // harvest from source
        if (target && creep.memory.isEmpty === true) {
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // transfer to extension
        else {
            if (extensions && creep.memory.spawn === true) {
                for (let i in extensions) {
                    if (creep.transfer(extensions[i], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(extensions[i]);
                    }
                }
            }
            else
                roleHarvester.run(creep);
        }
    }
};
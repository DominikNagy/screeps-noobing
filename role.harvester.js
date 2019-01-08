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
        const extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });

        let extensionsFull;

        if (extensions[0].energy === extensions[0].energyCapacity && extensions[1].energy === extensions[1].energyCapacity && extensions[2].energy === extensions[2].energyCapacity && extensions[3].energy === extensions[3].energyCapacity && extensions[4].energy === extensions[4].energyCapacity && extensions[5].energy === extensions[5].energyCapacity && extensions[6].energy === extensions[6].energyCapacity && extensions[7].energy === extensions[7].energyCapacity && extensions[8].energy === extensions[8].energyCapacity && extensions[9].energy === extensions[9].energyCapacity) {
            extensionsFull = true;
        }
        else
            extensionsFull = false;
        // harvest from source
        if (target && creep.memory.isEmpty === true) {
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // transfer to controller/spawn/extension
        else {
            if (!extensionsFull) {
                for (let i in extensions) {
                    if (extensions[i].energy < extensions[i].energyCapacity) {
                        if (creep.transfer(extensions[i], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(extensions[i]);
                        }
                    }
                }
            }
            else if (Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
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
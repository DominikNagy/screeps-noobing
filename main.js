var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    const extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    console.log(" ");

    // carry 200
    // var canSpawn = Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], ""+Game.time, {
    //     memory: { role: 'harvester', spawn: true },
    //     energyStructures: [
    //         Game.spawns['Spawn1'],
    //         Game.getObjectById(extensions[0].id),
    //         Game.getObjectById(extensions[1].id),
    //         Game.getObjectById(extensions[2].id),
    //         Game.getObjectById(extensions[3].id),
    //         Game.getObjectById(extensions[4].id),
    //         Game.getObjectById(extensions[5].id),
    //         Game.getObjectById(extensions[6].id),
    //         Game.getObjectById(extensions[7].id),
    //         Game.getObjectById(extensions[8].id)
    //     ],
    //     dryRun: true
    // });
    //
    // console.log("Can spawn?? "+canSpawn);
    let builders = 0;
    let harvesters = 0;
    let repairers = 0;

    for (let i in Game.creeps) {
        switch (Game.creeps[i].memory.role) {
            case 'harvester':
                harvesters++;
                break;
            case 'builder':
                builders++;
                break;
            case 'repairer':
                repairers++;
        }
    }
    if (harvesters === 0 || harvesters === 1) {
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], ""+Game.time, {memory: { role: 'harvester', spawn: true }});
    }
    else if (harvesters < 7) {
        let spawnORupgrade = Math.random(); // deciding if the creep will upgrade the controller, or spawn
        if (spawnORupgrade < 0.60) {
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], ""+Game.time, {
                memory: { role: 'harvester', spawn: true },
                energyStructures: [
                    Game.spawns['Spawn1'],
                    Game.getObjectById(extensions[0].id),
                    Game.getObjectById(extensions[1].id),
                    Game.getObjectById(extensions[2].id),
                    Game.getObjectById(extensions[3].id),
                    Game.getObjectById(extensions[4].id),
                    Game.getObjectById(extensions[5].id),
                    Game.getObjectById(extensions[6].id),
                    Game.getObjectById(extensions[7].id),
                    Game.getObjectById(extensions[8].id)
                ]
            });
        }
        else {
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], "" + Game.time, {
                memory: {role: 'harvester', spawn: false},
                energyStructures: [
                    Game.spawns['Spawn1'],
                    Game.getObjectById(extensions[0].id),
                    Game.getObjectById(extensions[1].id),
                    Game.getObjectById(extensions[2].id),
                    Game.getObjectById(extensions[3].id),
                    Game.getObjectById(extensions[4].id),
                    Game.getObjectById(extensions[5].id),
                    Game.getObjectById(extensions[6].id),
                    Game.getObjectById(extensions[7].id),
                    Game.getObjectById(extensions[8].id)
                ]
            });
        }
    }
    else if (repairers < 2) {
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], ""+Game.time, {
            memory: { role: 'repairer'},
            energyStructures: [
                Game.spawns['Spawn1'],
                Game.getObjectById(extensions[0].id),
                Game.getObjectById(extensions[1].id),
                Game.getObjectById(extensions[2].id),
                Game.getObjectById(extensions[3].id),
                Game.getObjectById(extensions[4].id),
                Game.getObjectById(extensions[5].id),
                Game.getObjectById(extensions[6].id),
                Game.getObjectById(extensions[7].id),
                Game.getObjectById(extensions[8].id)
            ]
        });
    }

    else if (builders < 5) {
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], ""+Game.time, {
            memory: { role: 'builder'},
            energyStructures: [
                Game.spawns['Spawn1'],
                Game.getObjectById(extensions[0].id),
                Game.getObjectById(extensions[1].id),
                Game.getObjectById(extensions[2].id),
                Game.getObjectById(extensions[3].id),
                Game.getObjectById(extensions[4].id),
                Game.getObjectById(extensions[5].id),
                Game.getObjectById(extensions[6].id),
                Game.getObjectById(extensions[7].id),
                Game.getObjectById(extensions[8].id)
            ]
        });
    }


    console.log("Harvesters: " +harvesters+ " Builders: " +builders+ " Repairers: " +repairers);
    //console.log(Game.spawns['Spawn1'].energy);
    for (let i in Game.creeps) {
        if (Game.creeps[i].memory.role === 'harvester') {
                roleHarvester.run(Game.creeps[i]);
        }

        else if (Game.creeps[i].memory.role === 'builder') {
            roleBuilder.run(Game.creeps[i]);
        }

        else if (Game.creeps[i].memory.role === 'repairer') {
            roleRepairer.run(Game.creeps[i]);
        }

        console.log(Game.creeps[i].name+ " " +_.sum(Game.creeps[i].carry)+ " " +Game.creeps[i].memory.role+" Spawner: " +Game.creeps[i].memory.spawn);
    }

    //clear memory
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
};
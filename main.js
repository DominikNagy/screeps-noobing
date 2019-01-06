var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleExtensioner = require('role.extensioners');


module.exports.loop = function () {
    console.log(" ");
    console.log();

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
    //Game.spawns.Spawn1.spawnCreep([WORK,CARRY,CARRY,MOVE], ""+Game.time, {memory: {role: 'harvester', spawn: true}});
    if (harvesters < 7) {
        let spawnORupgrade = Math.random(); // deciding if the creep will upgrade the controller, or spawn
        if (spawnORupgrade < 0.60) {
            Game.spawns.Spawn1.spawnCreep([WORK,CARRY,CARRY,MOVE], ""+Game.time, {memory: {role: 'harvester', spawn: true}});
        }
        else
            Game.spawns.Spawn1.spawnCreep([WORK,CARRY,MOVE,MOVE], ""+Game.time, {memory: {role: 'harvester', spawn: false}});
    }

    else if (repairers < 2) {
        Game.spawns.Spawn1.spawnCreep([WORK,CARRY,MOVE,MOVE], ""+Game.time, {memory: {role: 'repairer'}});
    }

    else if (builders < 5) {
        Game.spawns.Spawn1.spawnCreep([WORK,CARRY,MOVE,MOVE], ""+Game.time, {memory: {role: 'builder'}});
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
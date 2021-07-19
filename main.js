var roleHarvester = require("role.harvester");
var roleHarvesterBig = require('role.harvester.big');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
var roleFixerRoads = require('role.fixer.roads');
var roleFighter = require('role.fighter');
var roleFixerC = require('role.fixer.container');
var roleXfer = require('role.xfer');
var pixels = require('pixel');

module.exports.loop = function() {
    roleHarvester.spawn(2);
    roleHarvesterBig.spawn(3);
    roleUpgrader.spawn(4);
    roleBuilder.spawn(0);
    roleFixer.spawn(0);
    roleFixerC.spawn(1);
    roleFixerRoads.spawn(2);
    //roleFighter.spawn(0);
    roleXfer.spawn(2);
    console.log('PixelBucket: ' + Game.cpu.bucket + ' PixelCost:' + PIXEL_CPU_COST)
    console.log(' ')
    pixels.generatePixel()
        //pixels.tradePixels()
     var tower = Game.getObjectById('60f1af8717defdd5b3d03f3b');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'harvesterBig') {
            roleHarvesterBig.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        }
        if (creep.memory.role == 'fixerC') {
            roleFixerC.run(creep);
        }
        if (creep.memory.role == 'fixerRoads') {
            roleFixerRoads.run(creep);
        }
        if (creep.memory.role == 'fighter') {
            roleFighter.run(creep);
        }
        if (creep.memory.role == 'xfer') {
            roleXfer.run(creep);
        }
    }
}
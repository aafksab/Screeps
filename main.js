var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
var pixels = require("pixel");

module.exports.loop = function () {
    roleHarvester.spawn(4);
    roleUpgrader.spawn(2);
    roleBuilder.spawn(4);
    roleFixer.spawn(4);
    console.log(' ')
    console.log('PixelBucket: ' + Game.cpu.bucket+ ' PixelCost:' + PIXEL_CPU_COST)
    console.log(' ')
    pixels.generatePixel()
    //pixels.tradePixels()

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        }
    }

}
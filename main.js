var roleHarvester = require('../roles/role.harvester');
var roleHarvesterBig = require('../roles/role.harvester.big');
var roleUpgrader = require('../roles/role.upgrader');
var roleBuilder = require('../roles/role.builder');
var roleFixer = require('../roles/role.fixer');
var roleFixerRoads = require('../roles/role.fixer.roads');
var roleFighter = require('../roles/role.fighter');
var roleFixerC = require('../roles/role.fixer.container');
var roleXfer = require('../roles/role.xfer');
var pixels = require('../utility/pixel');

module.exports.loop = function () {
    roleHarvester.spawn(2);
    roleHarvesterBig.spawn(2);
    roleUpgrader.spawn(6);
    roleBuilder.spawn(0);
    roleFixer.spawn(1);
    roleFixerC.spawn(2);
    roleFixerRoads.spawn(1);
    //roleFighter.spawn(0);
    roleXfer.spawn(0);
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
        if(creep.memory.role == 'harvesterBig') {
            roleHarvesterBig.run(creep);
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
        if(creep.memory.role == 'fixerC') {
            roleFixerC.run(creep);
        }
        if(creep.memory.role == 'fixerRoads') {
            roleFixerRoads.run(creep);
        }
        if(creep.memory.role == 'fighter') {
            roleFighter.run(creep);
        }
        if(creep.memory.role == 'xfer') {
            roleXfer.run(creep);
        }
    }
}
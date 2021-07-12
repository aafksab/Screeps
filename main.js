var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

function gen_pixel() {
	if (Game.cpu.bucket >= PIXEL_CPU_COST) {
		Game.cpu.generatePixel();
	}
}

module.exports.loop = function () {

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
            roleHarvester.spawn();
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            roleUpgrader.spawn();
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            roleBuilder.spawn();
        }
    gen_pixel();
    }
}
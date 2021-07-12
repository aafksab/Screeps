Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );

Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester2' );

Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'upgrader' );

Game.spawns['Spawn1'].room.controller.activateSafeMode();

Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );

var creep = Game.creeps['builder29666127'];var sources = creep.room.find(FIND_SOURCES);sources[1]

















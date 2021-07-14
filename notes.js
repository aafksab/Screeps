Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );

Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester2' );

Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'upgrader' );

Game.spawns['Spawn1'].room.controller.activateSafeMode();

Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );

var creep = Game.creeps['Harvester34434945'];var struct = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.hits < 35000});console.log((struct.sort(function(a,b){return a.hits[1] - b.hits[1]})));
var creep = Game.creeps['Harvester34434945'];
var struct = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: (s) => s.hits < s.hitsMax && s.hits < 35000
},
{
    sortBy: function(a,b) {
        return a.hits[1] - b.hits[1]
    }
});
console.log(struct);



var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

struct.sort(function(a,b){
    return a.hits[1] - b.hits[1]
});
var roleHarvesterBig = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN /*|| structure.structureType == STRUCTURE_CONTAINER*/ )&&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; 
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	},
    spawn: function(scale) {
        var harvesterBig = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterBig');
        console.log('harvesterBig:' + harvesterBig.length + ' Max:' + scale);
        if(harvesterBig.length < scale) {
            var newName = 'harvesterBig' + Game.time;
           //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'harvesterBig'}});
        }
    }
};

module.exports = roleHarvesterBig;
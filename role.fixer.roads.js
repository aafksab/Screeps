var roleFixerRoads = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.repairing == true && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('⚡ repair');
        }
        if (creep.memory.repairing == true) {
            var structure = creep.room.find( FIND_STRUCTURES, { filter: ( f ) => {
                return (f.hits < f.hitsMax /* && f.structureType == STRUCTURE_WALL */ && f.hits < 35000)}})
            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            /*else {
                creep.say('now builder');
                creep.memory.role = 'builder';
            }*/
        }
        else  {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
    spawn: function(scale, structure) {
        var fixerRoads = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixerRoads');
        console.log('fixerRoads:' + fixerRoads.length + ' Max:' + scale);
        if(fixerRoads.length < scale) {
            var newName = 'fixerRoads' + Game.time;
            //console.log('Spawning new fixer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'fixerRoads'}});
        }
    }
};

module.exports = roleFixerRoads;
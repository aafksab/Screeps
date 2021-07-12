var roleFixer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
    spawn: function(scale) {
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
        console.log('builder: ' + builder.length + ' Max:' + scale);
        if(builder.length < scale) {
            var newName = 'builder' + Game.time;
            //console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'builder'}});
        }
    }
};

module.exports = roleFixer;
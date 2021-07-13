var roleFixer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.repairing == true && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('⚡ repair');
        }
        if (creep.memory.repairing == true) { 
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.hits < 1000
            });
            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                creep.say('now builder');
                creep.memory.role = 'builder';
            }
        }
        else  {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },
    spawn: function(scale) {
        var fixer = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
        console.log('fixer:' + fixer.length + ' Max:' + scale);
        if(fixer.length < scale) {
            var newName = 'fixer' + Game.time;
            //console.log('Spawning new fixer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'fixer'}});
        }
    }
};

module.exports = roleFixer;
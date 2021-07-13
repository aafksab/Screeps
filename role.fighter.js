var roleFighter = {
    /** @param {Creep} creep **/
    run: function (creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return;
            }
       
        const hostile = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        if (hostile) {
            if (creep.attack(hostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostile);
                return;
                }
            }
        }
    },
    spawn: function (scale) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        const hostile = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        var Fighter = _.filter(Game.creeps, (creep) => creep.memory.role == 'Fighter');
        console.log('Fighter:' + Fighter.length + ' Max:' + scale);
        if (target != undefined || hostile != undefined) { 
            var newName = 'fighter' + Game.time;
            //console.log('Spawning new Fighter: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([TOUGH,MOVE,MOVE,MOVE,ATTACK,ATTACK], newName, 
                {memory: {role: 'fighter'}});
        }
    }
}
module.exports = roleFighter;
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
        var target = Game.rooms['E42S44'].find(FIND_HOSTILE_CREEPS);
        var hostile = Game.rooms['E42S44'].find(FIND_HOSTILE_STRUCTURES);
        var Fighter = _.filter(Game.creeps, (creep) => creep.memory.role == 'Fighter');
        console.log('Fighter:' + Fighter.length + ' Max:' + scale); 
        if (target.length > 0 || hostile.length > 0) {
            console.log('Invader Found!')
            var newName = 'fighter' + Game.time;
            //console.log('Spawning new Fighter: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([TOUGH,RANGED_ATTACK,MOVE,MOVE,MOVE,WORK,ATTACK], newName, 
                {memory: {role: 'fighter'}});
        }
    }
}
module.exports = roleFighter;
var roleTurret = {
    /** @param {Creep} creep **/
    run: function (creep) {
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (creep) => creep.getActiveBodyparts(HEAL) > 0,
        });
        if (target) {
            creep.attack(target);
            return;
        }
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (creep) => creep.getActiveBodyparts(ATTACK) > 0 || creep.getActiveBodyparts(RANGED_ATTACK) > 0,
        });
        if (target) {
            creep.attack(target);
            return;
        }
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            creep.attack(target);
            return;
        }
        var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (structure) => structure.hits < structure.hitsMax,
        }).sort((a, b) => a.hits - b.hits);
        if (target) {
            creep.heal(target);
            return;
        }
        var target = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax,
        }).sort((a, b) => a.hits - b.hits);
        if (target) {
            creep.repair(target[0]);
            return;
        }
    }
}
module.exports = roleTurret;
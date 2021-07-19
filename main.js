var roleHarvester = require("role.harvester");
var roleHarvesterBig = require('role.harvester.big');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
var roleFixerRoads = require('role.fixer.roads');
var roleFighter = require('role.fighter');
var roleFixerC = require('role.fixer.container');
var roleXfer = require('role.xfer');
var roleXferTurret = require('role.xfer.turret')
var pixels = require('pixel');
var roleTurret = require('role.turret');
var tools = require('controller')
var turret = Game.getObjectById('60f1af8717defdd5b3d03f3b');

module.exports.loop = function() {
    roleHarvester.spawn(2);
    roleHarvesterBig.spawn(3);
    roleUpgrader.spawn(4);
    roleBuilder.spawn(0);
    roleFixer.spawn(1);
    roleXferTurret.spawn(1);
    roleFixerC.spawn(1);
    roleFixerRoads.spawn(2);
    //roleFighter.spawn(0);
    roleXfer.spawn(2);
    console.log('PixelBucket: ' + Game.cpu.bucket + ' PixelCost:' + PIXEL_CPU_COST);
    console.log(' ');
    pixels.generatePixel();
    tools.spawn();
    tools.clearMem();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'harvesterBig') {
            roleHarvesterBig.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        }
        if (creep.memory.role == 'fixerC') {
            roleFixerC.run(creep);
        }
        if (creep.memory.role == 'fixerRoads') {
            roleFixerRoads.run(creep);
        }
        if (creep.memory.role == 'fighter') {
            roleFighter.run(creep);
        }
        if (creep.memory.role == 'xfer') {
            roleXfer.run(creep);
        }
        if (creep.memory.role == 'xferTurret') {
            roleXferTurret.run(creep);
        }
        if (turret) {
            roleTurret.run(turret);
        }
    }
}
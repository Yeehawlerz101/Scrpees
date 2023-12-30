var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var manageCreeps = require('creep.upkeep');

module.exports.loop = function () {


    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    manageCreeps.manageCreeps();
    function upgraderRole(creep) {
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
          creep.memory.upgrading = false;
          creep.say(' harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
          creep.memory.upgrading = true;
          creep.say('⚡ upgrade');
        }
      
        if (creep.memory.upgrading) {
          if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
          }
        } else {
          var sources = creep.room.find(FIND_SOURCES);
          if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
          }
        }
      }


      function cleanMemory() {
        // Get a list of active creep IDs
        const activeCreepIds = Object.keys(Game.creeps);
        // Check for and remove inactive / dead creeps from Memory.creeps
        for (const creepId in Memory.creeps) {
          if (!activeCreepIds.includes(creepId)) {
            console.log(`Removing dead creep from memory: ${creepId}`);
            delete Memory.creeps[creepId];
          }
        }
    }
        cleanMemory()

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
       
        if(creep.memory.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.memory.role == 'upgrader') {
           // roleUpgrader.run(creep);
           upgraderRole(creep);
        }
        if(creep.memory.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
 
}
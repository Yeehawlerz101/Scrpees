function manageCreeps() {
  //console.log("Checking for creeps to spawn...");

  //   Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], role+"-"+random, { memory: { role: role }});
  // Get the main spawn
  const spawn = Game.spawns["Spawn1"]; // Replace "Spawn1" with your actual spawn name
  //  Game.spawns["Spawn1"].createCreep([WORK, CARRY, MOVE], role, { memory: { role: 'harvester' } });
  // set memory for the creep
  //   Game.creeps["Name"].memory.role = "harvester"
  // Check for each role in the desired priority order
  const rolesToCheck = ["harvester", "builder", "upgrader"];
  // Set the max number of creeps for each role
  const roleLimits = [1, 4, 3];
  const roleLimit_sm = [1, 4, 2];
  const roleLimits_md = [1, 4, 2];
  const roleLimits_lg = [1, 4, 2];
  let random = Math.floor(100 * Math.random()); // random number so i can assign easy names

  let CreepsWithRoleHarvester = Object.values(Game.creeps).filter(
    (creep) => creep.memory.memory.role === "harvester"
  ).length;
  let CreepsWithRoleBuilder = Object.values(Game.creeps).filter(
    (creep) => creep.memory.memory.role === "builder"
  ).length;
  let CreepsWithRoleUpgrader = Object.values(Game.creeps).filter(
    (creep) => creep.memory.memory.role === "upgrader"
  ).length;
  if (
    CreepsWithRoleHarvester > roleLimits[0] &&
    CreepsWithRoleBuilder > roleLimits[1] &&
    CreepsWithRoleUpgrader > roleLimits[2]
  ) {
    console.log("Too many creeps, not spawning any more");
    return;
  } else {
    console.log(
      CreepsWithRoleHarvester +
        " harvesters" +
        "\n" +
        CreepsWithRoleBuilder +
        " builders" +
        "\n" +
        CreepsWithRoleUpgrader +
        " upgraders" +
        "\n" +
        "Spawning missing creeps..."
    );
  }


  // Tech Levels
  let StoneAge = 300;
  let BronzeAge = 500;
  let IronAge = 800;
  let SteelAge = 1300;
  let IndustrialAge = 1800;



function getTechLevel(energyCapacityAvailable) {
  switch (energyCapacityAvailable){
    case energyCapacityAvailable = StoneAge:
      return "⛏ StoneAge"+ "\n"+"Next Tier:" + energyCapacityAvailable/BronzeAge * 100+"% complete";
    case energyCapacityAvailable >= StoneAge && energyCapacityAvailable < BronzeAge:

      return "⛏ StoneAge" + "\n"+"Next Tier:" + energyCapacityAvailable/BronzeAge * 100+"% complete";
     
    case energyCapacityAvailable >= BronzeAge && energyCapacityAvailable < IronAge:
      return "🥉 BronzeAge" + "\n"+"Next Tier:" + energyCapacityAvailable/IronAge * 100+"% complete";
    
    case energyCapacityAvailable >= IronAge && energyCapacityAvailable < SteelAge:
      return "⚔ IronAge" + "\n"+"Next Tier:" + energyCapacityAvailable/SteelAge * 100+"% complete";
      
    case energyCapacityAvailable >= SteelAge && energyCapacityAvailable < IndustrialAge:
      return "🏎 SteelAge" + "\n"+"Next Tier:" + energyCapacityAvailable/IndustrialAge * 100+"% complete";
   
    case energyCapacityAvailable >= IndustrialAge:
      return "🤖 IndustrialAge" + "\n"+"Next Tier:" + energyCapacityAvailable/IndustrialAge * 100+"% complete";
     
  }
 
}
  let HaulerBuilds = [
    {
      StoneAge: [MOVE, CARRY, MOVE],
    },
    {
      BronzeAge: [CARRY, CARRY, MOVE, MOVE],
    },
    {
      IronAge: [CARRY, CARRY, CARRY, MOVE, MOVE],
    },
    {
      SteelAge: [CARRY, CARRY, CARRY, MOVE, MOVE],
    },
    {
      IndustrialAge: [CARRY, CARRY, CARRY, MOVE, MOVE],
    },
  ];

  let HarvesterBuilds = [
    {
      StoneAge: [WORK, WORK, MOVE],
    },
    {
      BronzeAge: [WORK, WORK, WORK, MOVE],
    },
    {
      IronAge: [WORK, WORK, WORK, WORK, MOVE],
    },
    {
      SteelAge: [WORK, WORK, WORK, WORK, WORK, MOVE],
    },
    {
      IndustrialAge: [WORK, WORK, WORK, WORK, WORK, WORK, MOVE],
    },
  ];
  let BuilderBuilds = [{
      StoneAge: [WORK, CARRY, MOVE],
    },
    {
      BronzeAge: [WORK, CARRY, MOVE, MOVE],
    },
    {
      IronAge: [WORK,WORK, CARRY, MOVE, MOVE],
    },
    {
      SteelAge: [WORK,WORK,WORK, CARRY, MOVE, MOVE],
    },
    {
      IndustrialAge: [WORK,WORK,WORK, CARRY, MOVE, MOVE],
    },
  ];

  let UpgraderBuilds = [{
      StoneAge: [WORK, CARRY, MOVE],
    },
    {
      BronzeAge: [WORK, CARRY, MOVE, MOVE],
    },
    {
      IronAge: [WORK,WORK, CARRY, MOVE, MOVE],
    },
    {
      SteelAge: [WORK,WORK,WORK, CARRY, MOVE, MOVE],
    },
    {
      IndustrialAge: [WORK,WORK,WORK, CARRY, MOVE, MOVE],
    },
  ];

  // get all energy available to build the next creep
  const energyAvailable = spawn.room.energyAvailable;
  // get the max energy available to build the next creep
  const energyCapacityAvailable = spawn.room.energyCapacityAvailable;
  console.log("Energy Available: " + energyAvailable);
  console.log("Energy Capacity Available: " + energyCapacityAvailable);
console.log("Current Tech:", getTechLevel(energyCapacityAvailable))
  if (spawn.energy === 300) {
    console.log(spawn.energy);

    if (CreepsWithRoleHarvester < roleLimits[0]) {
      const NewHarvester = Game.spawns["Spawn1"].createCreep(
        [WORK, CARRY, MOVE],
        "harvester-" + random,
        { memory: { role: "harvester", status: "active", id: random } }
      );
      if (NewHarvester == ERR_NOT_ENOUGH_ENERGY) {
        console.log("Not enough energy to spawn a new harvester");
        return;
      } else {
        spawn.say("🔨 harvester");
        const creepID = NewHarvester.id;
        Game.creeps[NewHarvester].memory.memory.id = NewHarvester.id;
      }
    } else if (CreepsWithRoleBuilder < roleLimits[1]) {
      const NewBuilder = Game.spawns["Spawn1"].createCreep(
        [WORK, CARRY, MOVE],
        "builder-" + random,
        { memory: { role: "builder", status: "active", id: random } }
      );
      if (NewBuilder == ERR_NOT_ENOUGH_ENERGY) {
        console.log("Not enough energy to spawn a new builder");
        return;
      } else {
        const creepID = NewBuilder.id;
        Game.creeps[NewBuilder].memory.memory.id = NewBuilder.id;
      }
    } else if (CreepsWithRoleUpgrader < roleLimits[2]) {
      const NewUpgrader = Game.spawns["Spawn1"].createCreep(
        [WORK, CARRY, MOVE],
        "upgrader-" + random,
        { memory: { role: "upgrader", status: "active", id: random } }
      );
      if (NewUpgrader == ERR_NOT_ENOUGH_ENERGY) {
        console.log("Not enough energy to spawn a new upgrader");
        return;
      } else {
        const creepID = NewUpgrader.id;
        Game.creeps[NewUpgrader].memory.memory.id = NewUpgrader.id;
      }
    } else {
      console.log("No Creeps to spawn...");
    }
  }
}

// Call the function regularly within main.js
module.exports = {
  manageCreeps: manageCreeps,
};

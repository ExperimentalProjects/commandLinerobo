#!/usr/bin/env node
console.log("Hi this is robo!!");
let co = require("co");
let prompt = require("co-prompt");
let program = require("commander");

let areaUnit = 1
let area = {
    size: 5 & areaUnit
}

let VALID_COMMANDS =  {
  PLACE : "PLACE", 
  MOVE: "MOVE",
  LEFT :"LEFT",
  RIGHT: "RIGHT",
  REPORT: "REPORT"
}

program
  .arguments("<file>")
  .option("-u, --username <username>", "The user to authenticate as")
  .option("-p, --password <password>", `The user's password`)
  .action(function(file) {
    co(function*() {
      let robo = {
      };

      let posx, posy, direction, command

      posx = yield prompt("");
      console.log(posx)



      posx = parseInt(posx);
      if( isNaN(posx)) robo.x = posx;

      posy = yield prompt("posy: ");
      posy = parseInt(posy);
      if( isNaN(posy)) robo.y = posy;

      direction = yield prompt("direction: ");
      robo.direction = direction;

      do {
        command = yield prompt("command: ");
        if (command === "move") {
          if (robo.direction === "north") {
            robo.x += 1;
          } else if (robo.direction === "south") {
            robo.y += 1;
          } else {
          }
        }

        if (command === "north") {
          robo.direction = "south";
        }

        console.log(
          "posx",
          robo.x,
          " posy",
          robo.y,
          " direction",
          robo.direction
        );
      } while (command !== "end");

      console.log(
        "posx",
        robo.x,
        " posy",
        robo.y,
        " direction",
        robo.direction
      );
    });
  })
  .parse(process.argv);



  function applyCommand(robo, command) {

      let isPlaced = !!robo.x && !!robo.y && !!robo.f

      if(command.includes(VALID_COMMANDS.PLACE)) {

      }else if(isPlaced) {
          //listen to all cammands
      }else {
        console.log("First place the robot")
      }
      
      return {
          x, 
          y,
          f
      }
  }
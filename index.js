#!/usr/bin/env node
console.log("Hi this is robo!!");
let co = require("co");
let prompt = require("co-prompt");
let program = require("commander");

let areaUnit = 1
let area = {
  size: 5 * areaUnit
}

let DIRECTIONS = {
  NORTH: "NORTH",
  SOUTH: "SOUTH",
  EAST: "EAST",
  WEST: "WEST"
}

let VALID_COMMANDS = {
  PLACE: "PLACE",
  MOVE: "MOVE",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  REPORT: "REPORT"
}

program
  .action(function (file) {
    co(function* () {
      let robo = {
      };
      let command
      do {
        command = yield prompt("cmd: ");
        robo = applyCommand(robo, command)
      } while (command.toUpperCase() != VALID_COMMANDS.REPORT);
      console.log(
        "Output: ",
        robo.x,
        robo.y,
        robo.f
      );
    });
  })
  .parse(process.argv);



function applyCommand(robo, command) {

  let isPlaced = robo.placed

  command = command.toUpperCase().replace(/ /g, '')
  let x, y, f
  if (command.includes(VALID_COMMANDS.PLACE)) {
    let paramsStrings = command.replace(VALID_COMMANDS.PLACE, "").split(",")
    if (paramsStrings.length > 2) {
      x = parseInt(paramsStrings[0])
      y = parseInt(paramsStrings[1])
      f = paramsStrings[2]
      if (isNumber(x) && isNumber(y) && Object.values(DIRECTIONS).includes(f)) {
        robo = {
          x, y, f, placed: true
        }
      } else {
        console.log("Provide valid place value, ex: place 0, 0, north")
      }
    } else {
      console.log("Provide valid place value, ex: place 0, 0, north")
    }

  } else if (isPlaced) {
    //listen to all cammands
    if (command === VALID_COMMANDS.MOVE) {
      if (robo.f === DIRECTIONS.NORTH && robo.y < area.size) {
        robo.y += areaUnit
      }
      if (robo.f === DIRECTIONS.SOUTH && robo.y > -1 * area.size) {
        robo.y -= areaUnit
      }
      if (robo.f === DIRECTIONS.EAST && robo.x > area.size) {
        robo.x += areaUnit
      }
      if (robo.f === DIRECTIONS.WEST && robo.x > -1 * area.size) {
        robo.x -= areaUnit
      }

      // if robo crosses boundary then bring it back
    }

    if (command === VALID_COMMANDS.LEFT) {
      if (robo.f === DIRECTIONS.NORTH) {
        robo.f = DIRECTIONS.WEST
      }
      if (robo.f === DIRECTIONS.SOUTH) {
        robo.f = DIRECTIONS.EAST
      }
      if (robo.f === DIRECTIONS.EAST) {
        robo.f = DIRECTIONS.NORTH
      }
      if (robo.f === DIRECTIONS.WEST) {
        robo.f = DIRECTIONS.SOUTH
      }
    }

    if (command === VALID_COMMANDS.RIGHT) {
      if (robo.f === DIRECTIONS.NORTH) {
        robo.f = DIRECTIONS.EAST
      }
      if (robo.f === DIRECTIONS.SOUTH) {
        robo.f = DIRECTIONS.WEST
      }
      if (robo.f === DIRECTIONS.EAST) {
        robo.f = DIRECTIONS.SOUTH
      }
      if (robo.f === DIRECTIONS.WEST) {
        robo.f = DIRECTIONS.NORTH
      }
    }

  } else {
    console.log("First place the robot, for ex place 0, 0, north")
  }

  return robo
}

function isNumber(num) {
  return !isNaN(num)
}
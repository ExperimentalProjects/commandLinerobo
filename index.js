#!/usr/bin/env node
console.log("Hi this is robo!!");
let co = require("co");
let prompt = require("co-prompt");
let program = require("commander");
let myrobo = require("./robo")

program
  .action(function (file) {
    co(function* () {
      let robo = {
      };
      let command
      do {
        command = yield prompt("cmd: ");
        robo = myrobo.applyCommand(robo, command)
      } while (command.toUpperCase() != myrobo.VALID_COMMANDS.REPORT);
      console.log(
        "Output: ",
        robo.x,
        robo.y,
        robo.f
      );
    });
  })
  .parse(process.argv);

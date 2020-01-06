#!/usr/bin/env node
console.log("Hello, world!");
var co = require("co");
var prompt = require("co-prompt");
var program = require("commander");

program
  .arguments("<file>")
  .option("-u, --username <username>", "The user to authenticate as")
  .option("-p, --password <password>", `The user's password`)
  .action(function(file) {
    co(function*() {
      let robo = {
        x: 0,
        y: 0,
        direction: "north"
      };

      let posx = yield prompt("posx: ");
      isNaN(parseInt(posx)) && robo.x = parseInt(posx);

      let posy = yield prompt("posy: ");
      isNaN(parseInt(posy)) robo.y = parseInt(posy);

      let direction = yield prompt("direction: ");
      robo.direction = direction;

      do {
        let command = yield prompt("command: ");
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

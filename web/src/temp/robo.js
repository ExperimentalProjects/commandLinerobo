module.exports = {
    areaUnit: 1,
    area: function (unit = this.areaUnit) {
        return { size: 5 * unit }
    },
    DIRECTIONS: {
        NORTH: "NORTH",
        SOUTH: "SOUTH",
        EAST: "EAST",
        WEST: "WEST"
    },
    VALID_COMMANDS: {
        PLACE: "PLACE",
        MOVE: "MOVE",
        LEFT: "LEFT",
        RIGHT: "RIGHT",
        REPORT: "REPORT"
    },
    setArea: function (unit) {
        this.areaUnit = unit
        this.area(unit)
        return this.area()
    },
    applyCommand: function (robo, command) {
        let isPlaced = robo.placed
        command = command.toUpperCase().replace(/ /g, '')
        let x, y, f
        if (command.includes(this.VALID_COMMANDS.PLACE)) {
            let paramsStrings = command.replace(this.VALID_COMMANDS.PLACE, "").split(",")
            if (paramsStrings.length > 2) {
                x = parseInt(paramsStrings[0])
                y = parseInt(paramsStrings[1])
                f = paramsStrings[2]
                if (isNumber(x) && isNumber(y) && Object.values(this.DIRECTIONS).includes(f)) {
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
            if (command === this.VALID_COMMANDS.MOVE) {
                let areaSize = this.area().size
                if (robo.f === this.DIRECTIONS.NORTH && robo.y < areaSize) {
                    robo.y += this.areaUnit
                }
                else if (robo.f === this.DIRECTIONS.SOUTH && robo.y > -1 * areaSize) {
                    robo.y -= this.areaUnit
                }
                else if (robo.f === this.DIRECTIONS.EAST && robo.x > areaSize) {
                    robo.x += this.areaUnit
                }
                else if (robo.f === this.DIRECTIONS.WEST && robo.x > -1 * areaSize) {
                    robo.x -= this.areaUnit
                }

                // if robo crosses boundary then bring it back
            }

            if (command === this.VALID_COMMANDS.LEFT) {
                if (robo.f === this.DIRECTIONS.NORTH) {
                    robo.f = this.DIRECTIONS.WEST
                } else if (robo.f === this.DIRECTIONS.SOUTH) {
                    robo.f = this.DIRECTIONS.EAST
                }
                else if (robo.f === this.DIRECTIONS.EAST) {
                    robo.f = this.DIRECTIONS.NORTH
                }
                else if (robo.f === this.DIRECTIONS.WEST) {
                    robo.f = this.DIRECTIONS.SOUTH
                }
            }

            if (command === this.VALID_COMMANDS.RIGHT) {
                if (robo.f === this.DIRECTIONS.NORTH) {
                    robo.f = this.DIRECTIONS.EAST
                }
                else if (robo.f === this.DIRECTIONS.SOUTH) {
                    robo.f = this.DIRECTIONS.WEST
                }
                else if (robo.f === this.DIRECTIONS.EAST) {
                    robo.f = this.DIRECTIONS.SOUTH
                }
                else if (robo.f === this.DIRECTIONS.WEST) {
                    robo.f = this.DIRECTIONS.NORTH
                }
            }

        } else {
            console.log("First place the robot, for ex place 0, 0, north")
        }

        console.log(robo)

        return robo
    }


}


function isNumber(num) {
    return !isNaN(num)
}
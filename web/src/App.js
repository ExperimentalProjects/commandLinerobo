import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import robo from 'value3-robo/robo'

// import robo from "./robotest";
let areaUnit = 50;

//initializing robo area.
let roboPlayArea = robo.setArea(areaUnit);

console.log(roboPlayArea);

let enteredComment = null;
function App() {
  const [myRobo, updateRobo] = useState({});
  const [update, toggleUpdate] = useState(false);
  const [enteredCommand, setCommand] = useState(null);
  console.log(myRobo);

  return (
    <div>
      <form>
        <input
          type={"text"}
          name="command"
          placeholder="Enter command"
          onBlur={e => {
            setCommand(e.target.value);
          }}
          style={{
            ...actionButtonStyle,
            width: 200,
            height: 35,
            borderColor: "black"
          }}
        ></input>
        <input
          type="submit"
          value="Send Command"
          onClick={event => {
            event.preventDefault();
            if (enteredCommand) {
              updateRobo(robo.applyCommand(myRobo, enteredCommand));
              toggleUpdate(!update);
            }
          }}
          style={{ ...actionButtonStyle, width: 200, height: 40 }}
        ></input>
        <span style={{ fontSize: 12, color: "grey" }}>
          {" "}
          Commands example: place 0,0,north | move| left| right <br/>
          Use these buttons to move and change direction
        </span>
      </form>
      <div style={{ paddingVertical: 10 }}>
        <input
          type="button"
          value="MOVE"
          onClick={event => {
            event.preventDefault();
            updateRobo(robo.applyCommand(myRobo, "move"));
            toggleUpdate(!update);
          }}
          style={actionButtonStyle}
        ></input>
        <input
          type="button"
          value="Left"
          onClick={event => {
            event.preventDefault();
            updateRobo(robo.applyCommand(myRobo, "left"));
            toggleUpdate(!update);
          }}
          style={actionButtonStyle}
        ></input>
        <input
          type="button"
          value="Right"
          onClick={event => {
            event.preventDefault();
            updateRobo(robo.applyCommand(myRobo, "right"));
            toggleUpdate(!update);
          }}
          style={actionButtonStyle}
        ></input>
      </div>
      <div
        style={{
          marginLeft: 10,
          position: "relative",
          width: roboPlayArea.size + areaUnit,
          height: roboPlayArea.size + areaUnit,
          border: "1px solid black"
        }}
      >
        {myRobo.placed && (
          <div
            style={{
              width: areaUnit - 8,
              height: areaUnit - 8,
              backgroundColor: "cyan",
              position: "absolute",
              left: myRobo.x,
              bottom: myRobo.y,
              border: "4px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {myRobo.f === robo.DIRECTIONS.NORTH && <span>&#8593;</span>}
            {myRobo.f === robo.DIRECTIONS.WEST && <span>&#8592;</span>}
            {myRobo.f === robo.DIRECTIONS.SOUTH && <span>&#8595;</span>}
            {myRobo.f === robo.DIRECTIONS.EAST && <span>&#8594;</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

const actionButtonStyle = {
  width: 80,
  height: 30,
  margin: 10,
  borderRadius: 2
};

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import robo from 'value3-robo/robo'

let areaUnit = 50

let roboPlayArea = robo.setArea(areaUnit)

console.log(roboPlayArea)

let enteredComment = null
function App() {
  const [myRobo, updateRobo] = useState({})
  const [update, toggleUpdate] = useState(false)
  const [enteredCommand, setCommand] = useState(null)
  console.log(myRobo)

  return (
    <div>
      <form>
        <input type={"text"} name="command" 
         placeholder="Enter command"
         onBlur={e => {
          setCommand(e.target.value)
        }}
          style={{ width: 200, height: 30, margin:10 }}></input>
        <input type="submit" value="Send Command" onClick={event => {
          event.preventDefault();
          if(enteredCommand) {
            updateRobo(robo.applyCommand(myRobo, enteredCommand))
            toggleUpdate(!update)
          }
        }}
        style={{ width: 200, height: 40 }}
        ></input>
        <span style={{fontSize:12,color:"grey"}}> Commands example: place 0,0,north | move| left| right</span>
      </form>
      <div style={{ marginLeft: roboPlayArea.size, position: 'relative', width: roboPlayArea.size + areaUnit, height: roboPlayArea.size + areaUnit, borderLeft: "1px solid black", borderBottom: "1px solid black" }}>
        {myRobo.placed && <div
          style={{
            width: areaUnit,
            height: areaUnit,
            backgroundColor: 'cyan',
            position: 'absolute',
            left: myRobo.x,
            bottom: myRobo.y,
            border: "4px solid black",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {myRobo.f === robo.DIRECTIONS.NORTH && <span>&#8593;</span>}
          {myRobo.f === robo.DIRECTIONS.WEST && <span>&#8592;</span>}
          {myRobo.f === robo.DIRECTIONS.SOUTH && <span>&#8595;</span>}
          {myRobo.f === robo.DIRECTIONS.EAST && <span>&#8594;</span>}
        </div>}
      </div>
    </div>
  );
}

export default App;


// Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
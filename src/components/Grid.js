import React, { useState } from "react";
import { StyleSheet, View, Button, Dimensions,Text } from "react-native";
import { Cell } from "./Cell";

export const Grid = ({ size, image, onDraw = () => {}, onDoubleTap }) => {
  const stab = [...Array(size).keys()];
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [lastTap, setLastTap] = useState(null);

  const handleStartShouldSetResponderCapture = (evt) => {
    return true;
  };
  //the responder system bubbles up from the deepest component,
  //a parent View wants to prevent the child from becoming responder on a touch move
  const handleMoveShouldSetResponderCapture = (evt) => {
    return true;
  };

  /* Lifecycle handles */
  //Does this view want to become responder on the start of a touch?
  const handleStartShouldSetResponder = (evt) => {
    return true;
  };
  //Called for every touch move on the View when it is not the responder:
  //does this view want to "claim" touch responsiveness?
  const handleMoveShouldSetResponder = (evt) => {
    return true;
  };
  //The View is now responding for touch events.
  const handleResponderGrant = (evt) => {
    console.log("you are touching me");
  };
  //Something else is the responder right now and will not release it
  const handleResponderReject = (evt) => {
    console.log("please wait in line");
  };

  /* event handles */
  //touch move
  const handleResponderMove = (evt) => {
    // console.log(viewWidth, " ", viewHeight)
    const { pageX, pageY } = evt.nativeEvent;
    // console.log(evt.nativeEvent)
    // console.log('touch move at:', {locationX, locationY, pageX, pageY});
    const y = Math.floor(pageY / (viewHeight / size));
    const x = Math.floor(pageX / (viewWidth / size));
    onDraw(x, y);
  };
  //touch end/up
  const handleResponderRelease = (evt) => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      onDoubleTap();
    } else {
      setLastTap(now);
    }
  };
  //Something else wants to become responder. Should this view release the responder?
  const handleResponderTerminationRequest = (evt) => {
    return true;
  };
  //touch cancel
  const handleResponderTerminate = (evt) => {
    console.log("touch canceled");
  };

  const handleLayout = (evt) => {
    const { width, height } = evt.nativeEvent.layout;
    setViewWidth(width)
    setViewHeight(height)
  };

  return (
    <View
      onStartShouldSetResponderCapture={handleStartShouldSetResponderCapture}
      onMoveShouldSetResponderCapture={handleMoveShouldSetResponderCapture}
      onStartShouldSetResponder={handleStartShouldSetResponder}
      onMoveShouldSetResponder={handleMoveShouldSetResponder}
      onResponderGrant={handleResponderGrant}
      onResponderReject={handleResponderReject}
      onResponderMove={handleResponderMove}
      onResponderRelease={handleResponderRelease}
      onResponderTerminationRequest={handleResponderTerminationRequest}
      onResponderTerminate={handleResponderTerminate}
      onLayout={handleLayout}
      style={styles.container}
    >
      {stab.map((y) => (
        <View key={y} style={styles.row}>
          {stab.map((x) => (
            <Cell
              key={size * y + x}
              color={image[y * size + x]}
            ></Cell>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex:1
  },
  container: {
    backgroundColor: "black",
    flex: 1,
    // width: 100,
    // height: 100,
  },
});

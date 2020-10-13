import React, { useState, useEffect, useRef } from "react";
import { AppState, View } from "react-native";
import { Grid } from "./Grid";
import { useFocusEffect } from "@react-navigation/native";
import NfcManager, { NfcTech, NfcEvents, Ndef } from "react-native-nfc-manager";
import HCE from "react-native-nfc-hce";

export const WriteScreen = () => {
  const size = 10;
  const [image, setImage] = useState(new Uint8Array(size * size));
  const appState = useRef(AppState.currentState);

  const onDraw = (x, y) => {
    const idx = size * y + x;
    if (image[idx] === 0) {
      image[idx] = 1;
      requestAnimationFrame(() => setImage(new Uint8Array(image)));
    }
  };

  const arr2str = (input) => {
    return input
      .join("")
      .match(RegExp(".{1," + size + "}", "g"))
      .map((x) => parseInt(x, 2))
      .join(",");
  };

  const startWrite = async () => {
    try {
      await NfcManager.unregisterTagEvent()
      await NfcManager.cancelTechnologyRequest().catch(() => 0);
      await NfcManager.setEventListener(NfcEvents.DiscoverTag, async (tag) => {
        try {
          await NfcManager.connect([NfcTech.Ndef]);
          console.log(arr2str(image))
          let bytes = Ndef.encodeMessage([Ndef.textRecord(arr2str(image))]);
          await NfcManager.writeNdefMessage(bytes);
        } catch (er) {
          console.warn(er);
        }
      });
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn("ex", ex);
    }
  };

  useEffect(() => {
    console.log("emulate");
    HCE.setCardContent(arr2str(image));
    return () => {};
  }, [image]);

  useEffect(() => {
    const _handleAppStateChange = (nextAppState) => {
      if (
        appState.current === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        HCE.setCardContent("");
      }
      appState.current = nextAppState;
    };
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {};
  }, []);

  useFocusEffect(() => {
    console.log("WriteScreen focused");
    NfcManager.start();
    startWrite();

    return () => {
      console.log("WriteScreen unfocused");
    };
  });

  const onClear = () => {
    setImage(new Uint8Array(size * size));
  };

  return (
    <View style={{ flex: 1 }}>
      <Grid size={size} image={image} onDraw={onDraw} onDoubleTap={onClear} />
    </View>
  );
};

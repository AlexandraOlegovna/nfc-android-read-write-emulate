import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Grid } from "./Grid";
import { useFocusEffect } from "@react-navigation/native";
import NfcManager, {
  NfcTech,
  NfcEvents,
  ByteParser,
  Ndef,
} from "react-native-nfc-manager";

export const ReadScreen = () => {
  const size = 10;
  const [image, setImage] = useState(new Uint8Array(size * size));
  const emulateAPDU = [
    0x00, 0xa4, 0x04, 0x00, 0x07, // header
    0xa0, 0x00, 0x00, 0x02, 0x47, 0x10, 0x01 //aid 
  ];

  const onClear = () => {
    setImage(new Uint8Array(size * size));
  };

  const startRead = async () => {
    const str2arr = (input) => {
      return input
        .split(",")
        .map((x) => parseInt(x, 10))
        .map((x) => x.toString(2))
        .map((x) => "0".repeat(10).substr(x.length) + x)
        .join("")
        .split("")
        .map((x) => +x);
    };

    try {
      await NfcManager.unregisterTagEvent()
      await NfcManager.cancelTechnologyRequest().catch(() => 0);
      await NfcManager.setEventListener(NfcEvents.DiscoverTag, async (tag) => {
        try {
          if (tag.ndefMessage &&
            Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
            content = Ndef.text.decodePayload(tag.ndefMessage[0].payload)
            console.log(new Uint8Array(str2arr(content)))
            setImage(new Uint8Array(str2arr(content)));
          } else {
            await NfcManager.connect([NfcTech.IsoDep]);
            let response = await NfcManager.transceive(emulateAPDU);
            content = ByteParser.byteToString(response)
            setImage(new Uint8Array(str2arr(content)));
          }
        } catch (er) {
          console.warn(er);
        }
      });
      NfcManager.registerTagEvent({
        readerModeFlags: 0x1,
        isReaderModeEnabled: true,
        readerModeDelay: 5
      });
    } catch (ex) {
      console.log("ex", ex);
    }
  };

  useFocusEffect(() => {
    NfcManager.start();
    startRead();

    return () => {};
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Grid size={size} image={image} onDoubleTap={onClear} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

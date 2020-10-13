# nfc-android-read-write-emulate
(only for Android)

Simple react native app allows you:
 - to draw images 
 - to write serialized image on NFC-tag
 - to broadcast the serialized image to other devices
 - to read and deserialize image from NFC-tag 
- to read and deserialize image from other devices

## Getting started

`$ npm install`


## Run android

`$ npm run android`

## Build APK for Android

### Step 1. Generate a keystore

`$ keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000`

or use file from official template
https://raw.githubusercontent.com/facebook/react-native/master/template/android/app/debug.keystore

### Step 2. Adding Keystore to your project

Copy the file `your_key_name.keystore` and paste it under the `android/app` directory 

### Step 3. Release APK Generation

`$ cd android ; ./gradlew assembleRelease`

You can find the generated APK at android/app/build/outputs/apk/app-release.apk.


## Setup

I you want to change application [AID](https://developer.android.com/guide/topics/connectivity/nfc/hce#ServiceSelection) use `aid_list.xml` in `android/app/src/main/res/xml/`

```xml
...
<aid-filter android:name="<YOUR AID>" />
</aid-group>
...
```

## Enjoy the app!

<img src="https://i.imgur.com/gfdUHuf.jpg" alt="drawing" width="200"/>
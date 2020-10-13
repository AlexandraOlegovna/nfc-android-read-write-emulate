import React from "react";

import "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReadScreen } from "./src/components/ReadScreen";
import { WriteScreen } from "./src/components/WriteScreen";

const Tab = createBottomTabNavigator();

class AppV2Apdu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({color, size }) => {
            let iconName;
            if (route.name === 'Read') {
              iconName = 'ios-book';
            } else if (route.name === 'Write') {
              iconName = 'ios-create';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'dodgerblue',
          inactiveTintColor: 'gray',
        }}
        >
          <Tab.Screen name="Read" component={ReadScreen} />
          <Tab.Screen name="Write" component={WriteScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppV2Apdu;

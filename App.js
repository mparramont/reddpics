import React from "react";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import DetailsScreen from "./DetailsScreen";
import PicsScreen from "./PicsScreen";

class HotScreen extends PicsScreen {}

class NewScreen extends PicsScreen {}

class TopScreen extends PicsScreen {}

class ControversialScreen extends PicsScreen {}

const HotStack = StackNavigator({
  Hot: { screen: HotScreen },
  Details: { screen: DetailsScreen }
});

const NewStack = StackNavigator({
  New: { screen: NewScreen },
  Details: { screen: DetailsScreen }
});

const TopStack = StackNavigator({
  Top: { screen: TopScreen },
  Details: { screen: DetailsScreen }
});

const ControversialStack = StackNavigator({
  Controversial: { screen: ControversialScreen },
  Details: { screen: DetailsScreen }
});

export default TabNavigator(
  {
    Hot: { screen: HotStack },
    New: { screen: NewStack },
    Top: { screen: TopStack },
    Controversial: { screen: ControversialStack }
  },
  {
    // navigationOptions: ({ navigation }) => ({
    //   tabBarIcon: ({ focused, tintColor }) => {
    //     const { routeName } = navigation.state;
    //     let iconName;
    //     if (routeName === "Home") {
    //       iconName = `ios-information-circle${focused ? "" : "-outline"}`;
    //     } else if (routeName === "Settings") {
    //       iconName = `ios-options${focused ? "" : "-outline"}`;
    //     }
    //
    //     // You can return any component that you like here! We usually use an
    //     // icon component from react-native-vector-icons
    //     return <Ionicons name={iconName} size={25} color={tintColor} />;
    //   }
    // }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    },
    animationEnabled: true,
    swipeEnabled: true
  }
);

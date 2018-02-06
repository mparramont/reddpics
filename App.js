import React from "react";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import DetailsScreen from "./DetailsScreen";
import PicsScreen from "./PicsScreen";

const HotStack = StackNavigator({
  Hot: { screen: PicsScreen },
  Details: { screen: DetailsScreen }
});

const NewStack = StackNavigator({
  New: { screen: PicsScreen },
  Details: { screen: DetailsScreen }
});

const TopStack = StackNavigator({
  Top: { screen: PicsScreen },
  Details: { screen: DetailsScreen }
});

const ControversialStack = StackNavigator({
  Controversial: { screen: PicsScreen },
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
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Hot") {
          iconName = "ios-flame";
        } else if (routeName === "New") {
          iconName = "ios-sunny";
        } else if (routeName === "Top") {
          iconName = "ios-star";
        } else if (routeName === "Controversial") {
          iconName = "ios-help-circle";
        }
        iconName += focused ? "" : "-outline";

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
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

import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView
} from "react-native";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";

class PicsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    try {
      let sorting = this.props.navigation.state.routeName.toLowerCase();
      let url = "https://api.reddit.com/r/pics/" + sorting + ".json";
      let response = await fetch(url);
      let responseJson = await response.json();
      let pics = responseJson.data.children;
      pics.map(pic => (pic.key = pic.data.id));
      this.setState({
        isLoading: false,
        console: responseJson,
        pics: pics
      });
    } catch (error) {
      console.error(error);
    }
  }

  onPressListItem(url, title) {
    this.props.navigation.navigate("Details", {
      url: url,
      title: title
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.title : null
    };
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.pics}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() =>
                this.onPressListItem(item.data.url, item.data.title)
              }
            >
              <Image
                style={{ width: "33%", height: 100 }}
                source={{ uri: item.data.thumbnail }}
              />
              <View
                style={{
                  width: "67%",
                  height: 100,
                  backgroundColor: "skyblue"
                }}
              >
                <View>
                  <Text>{item.data.created}</Text>
                </View>
                <View>
                  <Text>{item.data.title}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ width: "50%" }}>{item.data.author}</Text>
                  <Text style={{ width: "25%" }}>{item.data.score}</Text>
                  <Text style={{ width: "25%" }}>{item.data.num_comments}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.title : null
    };
  };

  render() {
    const { params } = this.props.navigation.state;
    const url = params ? params.url : null;

    return <WebView source={{ uri: url }} />;
  }
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

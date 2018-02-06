import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import Pic from "./Pic";

export default class PicsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.routeName : null
    };
  };

  componentDidMount() {
    this.fetchPicsFromReddit();
  }

  async fetchPicsFromReddit() {
    this.setState({
      isLoading: true
    });
    let sorting = this.props.navigation.state.routeName.toLowerCase();
    let url = "https://api.reddit.com/r/pics/" + sorting + ".json";
    try {
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

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    // TODO improvement: add infinite scroll
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.pics}
          refreshing={this.state.isLoading}
          onRefresh={() => this.fetchPicsFromReddit()}
          renderItem={({ item }) => (
            <Pic navigation={this.props.navigation} item={item} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

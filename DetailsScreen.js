import React from "react";
import { WebView } from "react-native";

export default class DetailsScreen extends React.Component {
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

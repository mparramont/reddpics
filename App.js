import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    try {
      let response = await fetch('https://api.reddit.com/r/pics/new.json');
      let responseJson = await response.json();
      let pics = responseJson.data.children
      pics.map(pic => pic.key = pic.data.id)
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

    return (
      <View style={styles.container}>
        <Text>reddpics!</Text>
        {/*<Text>{JSON.stringify(this.state.console)}</Text>*/}
        <FlatList
          data={this.state.pics}
          renderItem={({item}) => <Text>{item.data.url}</Text>}
        />
        <Text>Shake to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

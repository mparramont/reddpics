import React from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

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
          renderItem={({item}) =>
            <TouchableOpacity style={{flexDirection: 'row'}}
                               onPress={() => this.onPressListItem(item.data.url)}>
              <Image style={{width: '33%', height: 100 }}
                     source={{uri: item.data.thumbnail}}/>
              <View style={{width: '67%', height: 100, backgroundColor: 'skyblue'}}>
                <View>
                  <Text>{item.data.created}</Text>
                </View>
                <View>
                  <Text>{item.data.title}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{width: '50%'}}>{item.data.author}</Text>
                  <Text style={{width: '25%'}}>{item.data.score}</Text>
                  <Text style={{width: '25%'}}>{item.data.num_comments}</Text>
                </View>
              </View>
            </View>
          }
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

import React from 'react';
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
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
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

  onPressListItem(url, title) {
    this.props.navigation.navigate('Details', {
      url: url,
      title: title
    });
  }

  static navigationOptions = {
    title: 'reddpics',
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
        {/*<Text>{JSON.stringify(this.state.console)}</Text>*/}
        <FlatList
          data={this.state.pics}
          renderItem={({item}) =>
            <TouchableOpacity style={{flexDirection: 'row'}}
                               onPress={() =>
                                 this.onPressListItem(
                                   item.data.url,
                                   item.data.title
                                 )
                               }
            >
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
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.title : null,
    }
  };

  render() {
    const { params } = this.props.navigation.state;
    const url = params ? params.url : null;

    return (
      <WebView source={{uri: url}}/>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
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

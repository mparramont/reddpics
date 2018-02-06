import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Moment from "react-moment";
import "moment-timezone";

export default class Pic extends React.Component {
  onPressListItem(url, title) {
    this.props.navigation.navigate("Details", {
      url: url,
      title: title
    });
  }

  render() {
    let title = this.props.item.data.title;
    if (title.length > 50) title = title.substring(0, 50) + "…";

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          paddingTop: 8,
          paddingLeft: 4,
          paddingRight: 4,
          paddingBottom: 8,
          borderColor: "tomato",
          borderBottomWidth: 1
        }}
        onPress={() =>
          this.onPressListItem(
            this.props.item.data.url,
            this.props.item.data.title
          )
        }
      >
        <Image
          style={{ width: "33%", height: 100 }}
          source={{ uri: this.props.item.data.thumbnail }}
        />
        <View
          style={{
            width: "67%",
            height: 100,
            padding: 5,
            justifyContent: "space-between"
          }}
        >
          <View style={{ marginLeft: "auto" }}>
            <Moment fromNow unix tz="Europe/Madrid" element={Text}>
              {this.props.item.data.created_utc}
            </Moment>
          </View>
          <View>
            <Text style={{ fontSize: 18 }}>{title}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text>{this.props.item.data.author}</Text>
            <Text>{this.props.item.data.score}</Text>
            <Text>{this.props.item.data.num_comments}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

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
    return (
      <TouchableOpacity
        style={{ flexDirection: "row" }}
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
            backgroundColor: "skyblue"
          }}
        >
          <View>
            <Moment fromNow unix tz="Europe/Madrid" element={Text}>
              {this.props.item.data.created_utc}
            </Moment>
          </View>
          <View>
            <Text>{this.props.item.data.title}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ width: "50%" }}>{this.props.item.data.author}</Text>
            <Text style={{ width: "25%" }}>{this.props.item.data.score}</Text>
            <Text style={{ width: "25%" }}>
              {this.props.item.data.num_comments}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

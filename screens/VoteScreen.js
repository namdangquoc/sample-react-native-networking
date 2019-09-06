import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, Dimensions } from 'react-native';
import Axios from 'axios';

Axios.defaults.headers.post['x-api-key'] = '1eab38bb-866a-46df-8ec2-b3e09de50c34';

let screenWidth = Dimensions.get("window").width;
let sreenHeight = Dimensions.get("window").height;

class ImageItem extends Component {
  _onPressLike = () => {
    this.props.onPressLike(this.props.id, 1);
  }

  _onPressDislike = () => {
    this.props.onPressDislike(this.props.id, 0);
  }

  render() {
    return (
      <View style={{ width: screenWidth, height: sreenHeight }}>
        <Image
          source={{ uri: this.props.url }}
          style={{
            width: this.props.width,
            height: this.props.height,
            resizeMode: "stretch"
          }} />
        <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
          <TouchableOpacity style={{ height: 40, flex: 1 }} onPress={this._onPressLike}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5
              }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Like</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: 40, flex: 1 }} onPress={this._onPressDislike}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "blue",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5
              }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Dislike</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: ""
    };
  }

  componentWillMount() {
    Axios.get('https://api.thecatapi.com/v1/images/search')
      .then((response) => {
        this.setState({
          images: response.data
        });
        console.log("response: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("error: " + e);
      });
  }

  imageItem = ({ item }) => {
    let newHeight = screenWidth / item.width * item.height;
    return (
      <ImageItem
        width={screenWidth}
        height={newHeight}
        id={item.id}
        url={item.url}
        onPressLike={this.pushVote}
        onPressDislike={this.pushVote}
      />
    );
  }

  pushVote = (image_id, value) => {
    console.log(image_id, value);
    Axios.post(
      "https://api.thecatapi.com/v1/votes",
      {
        "image_id": image_id,
        "value": value
      })
      .then((response) => {
        console.log("vote response");
        console.log(response.data);

        if (value == 1) {
          alert("Liked");
        } else {
          alert("Disliked");
        }

      })
      .catch((error) => {
        console.log(error);

        if (value == 1) {
          alert("Like fail");
        } else {
          alert("Dislik fail");
        }
      })
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.images}
          renderItem={this.imageItem}
        />
      </ScrollView>
    );
  }
}

export default Home;

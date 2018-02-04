import "react-native";
import React from "react";
import TabNavigator from "../App";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

test("renders correctly", async () => {
  let mockResponse = `{
    "data": {
      "children": [{
        "data": {
          "id": "7v7fg2",
          "author": "omnicot",
          "score": 19440,
          "thumbnail":
            "https://b.thumbs.redditmedia.com/-LqcIIv3SFEuUvqKArGvIHxuasQPU6EApGZKmo6YLog.jpg",
          "url": "https://i.redd.it/199nszs6w7e01.png",
          "title":
            "My gf draws these for fun and I thought you guys would like them",
          "created_utc": 1517759326,
          "num_comments": 422
        }
      }]
    }
  }`;
  fetch.mockResponseSuccess(mockResponse);
  const tree = await renderer.create(<TabNavigator />).toJSON();
  expect(filterKeys(tree)).toMatchSnapshot();
});

const filterKeys = obj => {
  for (var k in obj) {
    if (typeof obj[k] == "object" && obj[k] !== null) filterKeys(obj[k]);
    else {
      if (k === "key") {
        obj[k] = null;
      }
    }
  }
  return obj;
};

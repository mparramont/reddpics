import "react-native";
import React from "react";
import Pic from "../Pic";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

let navigation = { navigate: jest.fn() };
let item = {
  data: {
    author: "omnicot",
    score: 19440,
    thumbnail:
      "https://b.thumbs.redditmedia.com/-LqcIIv3SFEuUvqKArGvIHxuasQPU6EApGZKmo6YLog.jpg",
    url: "https://i.redd.it/199nszs6w7e01.png",
    title: "some nice pic!",
    created_utc: 1517759326,
    num_comments: 422
  }
};

test("renders correctly", () => {
  const tree = renderer
    .create(<Pic navigation={navigation} item={item} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with a pretty long title, truncates it", () => {
  item.data.title =
    "This title is more than 50 characters long, so it will get truncated";
  const tree = renderer
    .create(<Pic navigation={navigation} item={item} />)
    .toJSON();
  const treeString = JSON.stringify(tree);

  expect(treeString).toEqual(
    expect.stringContaining(
      "This title is more than 50 characters long, so it …"
    )
  );
});

import React from "react";
import toJSON from "enzyme-to-json";
import EmojiButton from "./index";

const setUp = () => {
  const component = shallow(<EmojiButton />);
  return component;
};

describe("EmojiButton Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  it("match to snapshot", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

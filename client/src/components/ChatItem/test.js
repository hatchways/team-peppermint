import React from "react";
import { shallow } from "enzyme";
import ChatItem from "./index";
import UserAvatar from "../UserAvatar";
const user = {
  email: 'a@a.com',
  language:'english'
}

const setUp = (props = {}) => {
  const component = shallow(<ChatItem user={user} {...props} />);
  return component;
};

describe("ChatItem Component", () => {
  let component;
  beforeEach(() => {

    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = component.find(".makeStyles-root-1");
    expect(wrapper.length).toBe(1);
  });

  it("Should render an avatar", () => {
    const wrapper = component.find(UserAvatar);
    expect(wrapper.length).toBe(1);
  });
});

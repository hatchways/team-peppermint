import React from "react";
import { shallow } from "enzyme"; 
import UserAvatar from "./index";

const props = {
  imageUrl: {
    url:"http://www.google.com" 
  },
  isOnline:'true'
}

const setUp = () => {
  const component = shallow(
    <UserAvatar {...props} />
  );   
  return component;
};

describe("ChatItem Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Avatar exists and alt attribute value is Online Badge", () => {
    const wrapper = component.find('[className="makeStyles-avatar-2"]');
    expect(wrapper.exists("WithStyles(ForwardRef(Avatar))")).toEqual(true);
    expect(wrapper.exists('[data-testid="online"]')).toEqual(true);
  });
});

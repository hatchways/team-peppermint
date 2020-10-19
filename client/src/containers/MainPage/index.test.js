import React from "react";
import MainPage from "./index";
import toJSON from "enzyme-to-json";
import { shallow } from "enzyme";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<MainPage />);
});

describe("<MainPage />", () => {
  it("match to snapshot", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

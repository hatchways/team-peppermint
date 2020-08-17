import React from "react";
// import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import MainPage from "./index";

import renderer from "react-test-renderer";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<MainPage />);
});

// test("renders learn react link", () => {
// const { getByText } = render(<App />);
// const linkElement = getByText(/Button/i);
// expect(linkElement).toBeInTheDocument();
// const wrapper = shallow(<App />);
//   const textInButton = wrapper.find("Button").text();

//   expect(textInButton).toBe("Button");
// });

describe("<MainPage />", () => {
  it("match to snapshot", () => {
    // const tree = renderer.create(<MainPage />).toJSON();
    // const wrapper = shallow(<MainPage />);

    expect(wrapper).toMatchSnapshot();
  });
});

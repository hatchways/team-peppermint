import React from "react";
import MainContentFieldNavBar from "./index";

jest.mock("../../context/user/userContext.js", () => {
  return {
    useUserState: jest.fn(() => ({
      token: "123",
      user: {
        id: "1",
        name: "Jane",
        email: "jane@gmail.com",
        language: "English",
        pictureURL: { name: "123455", url: "https://www.picture.com" },
      },
    })),
  };
});

let wrapper;

beforeEach(() => {
  wrapper = shallow(<MainContentFieldNavBar />);
});

describe("<MainContentFieldNavBar />", () => {
  it("match to snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

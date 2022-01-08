import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";
import AppLayoutDefault from "@/layouts/AppLayoutDefault";

const mocks = {
  $route: {
    meta: {
      layout: "",
    },
  },
};

describe("AppLayout", () => {
  let wrapper;
  const slots = {
    default: "content",
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot content", () => {
    createComponent({ slots, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });
});

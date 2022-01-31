import { shallowMount } from "@vue/test-utils";
import AppLayoutDefault from "@/layouts/AppLayoutDefault";

describe("AppLayoutDefault", () => {
  let wrapper;
  const slots = {
    default: "content",
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutDefault, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders out the slot content', () => {
    createComponent({ slots });
    expect(wrapper.exists()).toBeTruthy();
  });
});

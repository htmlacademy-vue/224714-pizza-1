import { shallowMount } from "@vue/test-utils";
import AppLayoutMain from "@/layouts/AppLayoutMain";

describe("AppLayoutMain", () => {
  let wrapper;
  const slots = {
    default: "content",
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutMain, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders out the slot content', () => {
    createComponent({ slots });
    expect(wrapper.exists()).toBeTruthy();
  });
});

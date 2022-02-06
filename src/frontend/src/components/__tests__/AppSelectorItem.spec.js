import { shallowMount } from "@vue/test-utils";
import AppSelectorItem from "@/components/AppSelectorItem";

describe("AppSelectorItem", () => {
  const propsData = {
    ingredientName: "testName",
    ingredientValue: "testValue",
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppSelectorItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Has class with ingredientValue", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("class")).toContain(propsData.ingredientValue);
  });

  it("It sets text initial ingredientName property", () => {
    createComponent({ propsData });
    expect(wrapper.text()).toBe(propsData.ingredientName);
  });
});

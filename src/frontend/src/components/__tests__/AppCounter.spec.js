import { shallowMount } from "@vue/test-utils";
import AppCounter from "@/components/AppCounter";

describe("AppCounter", () => {
  const propsData = {
    name: "testName",
    value: 123,
    minValue: 0,
    maxValue: 3,
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("has class with name", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("class")).toContain(propsData.name);
  });

  it("It sets the initial input value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(
      propsData.value.toString()
    );
  });

  it("Emits minusOne event when click button minus", async () => {
    createComponent({ propsData });
    const btnMinus = wrapper.find(`[data-test="button--minus"]`);
    await btnMinus.trigger("click");
    expect(wrapper.emitted().minusOne).toBeTruthy();
  });

  it("Emits plusOne event when click button plus", async () => {
    createComponent({ propsData });
    const btnPlus = wrapper.find(`[data-test="button--plus"]`);
    await btnPlus.trigger("click");
    expect(wrapper.emitted().plusOne).toBeTruthy();
  });

  it("Disable minus button if value equals minValue", async () => {
    propsData.value = propsData.minValue;
    createComponent({ propsData });
    const btnMinus = wrapper.find(`[data-test="button--minus"]`);
    expect(btnMinus.attributes("disabled")).toBeTruthy();
  });

  it("Disable plus button if value equals maxValue", async () => {
    propsData.value = propsData.maxValue;
    createComponent({ propsData });
    const btnPlus = wrapper.find(`[data-test="button--plus"]`);
    expect(btnPlus.attributes("disabled")).toBeTruthy();
  });
});

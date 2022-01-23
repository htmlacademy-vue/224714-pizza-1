import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/components/RadioButton";

describe("RadioButton", () => {
  const propsData = {
    name: "testName",
    value: 123,
    isChecked: true,
  };
  const listeners = { change: null };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  beforeEach(() => {
    listeners.change = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });


  it('It sets the initial name', () => {
    createComponent({ propsData });
    expect(wrapper.attributes('name')).toBe(propsData.name);
  });

  it('It sets the initial value', () => {
    createComponent({ propsData });
    expect(wrapper.element.value).toBe(propsData.value.toString());
  });

  it('It sets the initial checked', () => {
    createComponent({ propsData });
    expect(wrapper.attributes('checked')).toBe(propsData.checked);
  });

  it('It emits an valueChanged when radio button changed', async () => {
    createComponent({ propsData, listeners });
    await wrapper.trigger("change");
    expect(wrapper.emitted().valueChanged).toBeTruthy();
  });

  it('emits the current input value when changed', async () => {
    createComponent({ propsData });
    await wrapper.trigger('change');
    expect(wrapper.emitted().valueChanged[0][0]).toEqual(propsData.value);
  });
});

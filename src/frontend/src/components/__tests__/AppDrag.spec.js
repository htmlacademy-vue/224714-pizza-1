import { shallowMount } from "@vue/test-utils";
import AppDrag from "@/components/AppDrag";

describe("AppDrag", () => {
  const propsData = {
    draggable: true,
  };

  const listeners = { dragstart: null };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppDrag, options);
  };

  beforeEach(() => {
    listeners.change = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("has draggable attribute", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("draggable")).toContain(propsData.draggable);
  });

  // it("Emits onDrag event when dragstart", async () => {
  //   createComponent({ propsData });
  //   await wrapper.trigger("dragstart");
  //   expect(wrapper.emitted().onDrag).toBeTruthy();
  // });
});

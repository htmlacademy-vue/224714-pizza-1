import BuildSaucesSelector from "@/modules/builder/BuildSaucesSelector";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";

describe("BuildSaucesSelector", () => {
  let wrapper;
  let store;
  let actions;

  let propsData = {};

  const createComponent = (options) => {
    wrapper = mount(BuildSaucesSelector, options);
  };

  beforeEach(() => {
    propsData.isBtnActive = true;
    actions = {
      Builder: {
        setSauce: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render right amount of label items", async () => {
    createComponent({ store });
    const labels = wrapper.findAll("[data-test='label']");
    expect(labels).toHaveLength(store.getters["Builder/sauces"].length);
  });

  it("radio btn change dispatch Builder/setSauce", async () => {
    createComponent({ store });

    const doughRadio = wrapper.findAll(`[data-test="radio"]`).at(1);
    const newValue = store.getters["Builder/sauces"][1].id;
    await doughRadio.vm.$emit("valueChanged", newValue);
    expect(actions.Builder.setSauce).toHaveBeenCalledWith(
      expect.any(Object),
      newValue
    );
  });
});

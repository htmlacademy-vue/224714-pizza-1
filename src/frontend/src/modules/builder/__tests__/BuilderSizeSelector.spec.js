import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import { mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";

describe("BuilderSizeSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setDiameter: jest.fn(),
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
    expect(labels).toHaveLength(store.getters["Builder/sizes"].length);
  });

  it("label has correct css class", () => {
    createComponent({ store });
    expect(
      wrapper.findAll(`[data-test="label"]`).at(0).attributes("class")
    ).toContain(store.getters["Builder/sizes"][0].value);
  });

  it("renders correct name", () => {
    createComponent({ store });
    expect(wrapper.findAll(`[data-test="name"]`).at(0).text()).toBe(
      store.getters["Builder/sizes"][0].name
    );
  });

  it("radio btn change dispatch Builder/setDiameter", () => {
    createComponent({ store });

    const doughRadio = wrapper.findAll(`[data-test="radio"]`).at(1);
    const newValue = store.getters["Builder/sizes"][1].id;
    doughRadio.vm.$emit("change", newValue);
    expect(actions.Builder.setDiameter).toHaveBeenCalledWith(
      expect.any(Object),
      newValue
    );
  });
});

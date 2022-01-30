import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setDough: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render right amount of label items", async () => {
    createComponent({ localVue, store });
    const labels = wrapper.findAll("[data-test='label']");
    expect(labels).toHaveLength(store.getters["Builder/doughs"].length);
  });

  it("label has correct css class", () => {
    createComponent({ store });
    expect(
      wrapper.findAll(`[data-test="label"]`).at(0).attributes("class")
    ).toContain(store.getters["Builder/doughs"][0].value);
  });

  it("renders correct name", () => {
    createComponent({ store });
    expect(wrapper.findAll(`[data-test="name"]`).at(0).text()).toBe(
      store.getters["Builder/doughs"][0].name
    );
  });

  it("renders correct description", () => {
    createComponent({ store });
    expect(wrapper.findAll(`[data-test="description"]`).at(0).text()).toBe(
      store.getters["Builder/doughs"][0].description
    );
  });

  it("change dough", async () => {
    createComponent({ store });

    const doughRadio = wrapper.findAll(`[data-test="radio"]`).at(0);
    const newValue = store.getters["Builder/doughs"][0].id;
    await doughRadio.vm.$emit("change", newValue);
    expect(actions.Builder.setDough).toHaveBeenCalledWith(
      expect.any(Object),
      newValue
    );
  });
});

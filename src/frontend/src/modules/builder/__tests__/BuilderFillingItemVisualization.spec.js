import BuilderFillingItemVisualization from "@/modules/builder/BuilderFillingItemVisualization";
import { mount } from "@vue/test-utils";
import { addPizzas, generateMockStore } from "@/store/mocks";
import pizzas from "@/store/mocks/pizzas.json";

describe("BuilderFillingItemVisualization", () => {
  let wrapper;
  let store;

  const propsData = {
    fillingItem: "1",
    filling: { 1: 2 },
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderFillingItemVisualization, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("div has correct css class", () => {
    addPizzas(store, pizzas);
    createComponent({ store, propsData });
    expect(wrapper.attributes("class")).toContain(
      `pizza__filling--mushrooms pizza__filling--second`
    );
  });
});

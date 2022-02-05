import Index from "@/views/Index";
import { mount } from "@vue/test-utils";
import { generateMockStore, loadPizza } from "@/store/mocks";
import pizzas from "@/store/mocks/pizzas.json";

describe("Index", () => {
  let wrapper;
  let store;

  const stubs = ["router-view"];

  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("input pizza_name has correct value", async () => {
    createComponent({ store, stubs });
    await loadPizza(store, pizzas[0]);
    const input = wrapper.find(`[data-test="pizza-name"]`);
    expect(input.element.value).toBe(pizzas[0].name);
  });
});

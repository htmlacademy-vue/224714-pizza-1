import CartList from "@/modules/cart/CartList";
import { mount, createLocalVue } from "@vue/test-utils";
import { addPizzas, generateMockStore } from "@/store/mocks";
import pizzas from "@/store/mocks/pizzas.json";

const localVue = createLocalVue();

describe("CartFooter", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartList, options);
  };

  beforeEach(() => {
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders correct number of cartListItems", async () => {
    addPizzas(store, pizzas);
    createComponent({ localVue, store });
    const listItem = wrapper.findAll("[data-test='cart-list-item']");
    expect(listItem).toHaveLength(pizzas.length);
  });
});

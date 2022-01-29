import CartMiscListItem from "@/modules/cart/CartMiscListItem";
import { mount, createLocalVue } from "@vue/test-utils";
import {generateMockStore, addPizzas, addMiscs} from "@/store/mocks";
import misc from "@/static/misc.json";
import pizzas from "@/store/mocks/pizzas.json";

const localVue = createLocalVue();

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $route: {
    name: "Index",
  },
};

describe("CartMiscListItem", () => {
  let wrapper;
  let store;
  let actions;

  const propsData = {
    miscItem: misc[0],
    quantity: 2,
  };

  const createComponent = (options) => {
    wrapper = mount(CartMiscListItem, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        loadPizza: jest.fn(),
      },
      Cart: {
        plusOnePizza: jest.fn(),
        minusOnePizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("image has src attribute with correct src", () => {
    createComponent({ propsData, store });
    expect(wrapper.find(`[data-test="image"]`).attributes("src")).toContain(
      propsData.miscItem.image
    );
  });

  it("image has alt attribute with name", () => {
    createComponent({ propsData, store });
    expect(wrapper.find(`[data-test="image"]`).attributes("alt")).toContain(
      propsData.miscItem.name
    );
  });

  it("renders text name", () => {
    createComponent({ propsData, store });
    expect(wrapper.find(`[data-test="misc-name"]`).text()).toBe(
      propsData.miscItem.name
    );
  });

  it("renders total sum", () => {
    addMiscs(store, { [propsData.miscItem.id]: 2 });
    createComponent({ propsData, store, localVue });
    expect(wrapper.find(`[data-test="total"]`).text()).toBe(`${propsData.miscItem.price * 2} ₽`);
  });
});

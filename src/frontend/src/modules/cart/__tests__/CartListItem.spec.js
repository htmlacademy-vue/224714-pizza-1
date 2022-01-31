import CartListItem from "@/modules/cart/CartListItem";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import pizzas from "@/store/mocks/pizzas.json";
import { capitalizeFirstLetter, sauceMap } from "@/common/helpers";

const localVue = createLocalVue();

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $route: {
    name: "Index",
  },
};

describe("CartListItem", () => {
  let wrapper;
  let store;
  let actions;

  const propsData = {
    pizza: pizzas[0],
  };

  const createComponent = (options) => {
    wrapper = mount(CartListItem, options);
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

  it("has alt attribute with pizzaNameCapitalized", () => {
    createComponent({ propsData, store });
    expect(
      wrapper.find(`[data-test="pizza-image"]`).attributes("alt")
    ).toContain(capitalizeFirstLetter(propsData.pizza.name));
  });

  it("renders pizza name", () => {
    createComponent({ propsData, store });
    expect(wrapper.find(`[data-test="title"]`).text()).toBe(
      capitalizeFirstLetter(propsData.pizza.name)
    );
  });

  it("renders pizza size and dough", () => {
    createComponent({ propsData, store });
    expect(wrapper.find(`[data-test="size-and-dough"]`).text()).toContain(
      "45 см, на тонком тесте"
    );
  });

  it("renders pizza sauce", () => {
    createComponent({ propsData, store });
    expect(wrapper.find(`[data-test="sauce"]`).text()).toContain("томатный");
  });

  it("renders pizza filling", () => {
    createComponent({ propsData, store });
    expect(wrapper.find(`[data-test="filling"]`).text()).toContain("ветчина");
  });

  it("renders pizza sum", () => {
    createComponent({ propsData, store });
    expect(wrapper.find(`[data-test="sum"]`).text()).toBe("800 ₽");
  });

  it("dispatch Builder / loadPizza on btn change pizza click", async () => {
    createComponent({ propsData, store, mocks });
    const button = wrapper.find(`[data-test="change-btn"]`);
    await button.trigger("click");
    expect(actions.Builder.loadPizza).toHaveBeenCalledWith(
      expect.any(Object),
      pizzas[0]
    );
  });

  it("redirect to main page on btn change pizza click", async () => {
    createComponent({ propsData, store, mocks });
    const button = wrapper.find(`[data-test="change-btn"]`);
    await button.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: "Index" });
  });

  it("counter plus one click dispatch Cart/plusOnePizza", async () => {
    createComponent({ propsData, store, mocks });
    const counter = wrapper.find(`[data-test="counter"]`);
    await counter.vm.$emit("plusOne");
    expect(actions.Cart.plusOnePizza).toHaveBeenCalled();
  });

  it("counter plus one click dispatch Cart/minusOnePizza", async () => {
    createComponent({ propsData, store, mocks });
    const counter = wrapper.find(`[data-test="counter"]`);
    await counter.vm.$emit("minusOne");
    expect(actions.Cart.minusOnePizza).toHaveBeenCalled();
  });
});

import CartListItem from "@/modules/cart/CartListItem";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import pizzas from "@/store/mocks/pizzas.json";
import VueRouter from "vue-router";
import { capitalizeFirstLetter } from "@/common/helpers";
// import ItemCounter from "@/components/ItemCounter";

const localVue = createLocalVue();
const router = new VueRouter();

const mocks = {
  $router: {
    push: jest.fn(),
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
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("has alt attribute with with pizzaNameCapitalized", () => {
    createComponent({ propsData, store });
    expect(
      wrapper.find(`[data-test="pizza-image"]`).attributes("alt")
    ).toContain(capitalizeFirstLetter(propsData.pizza.name));
  });

  it("renders pizza name", () => {
    createComponent({ propsData, store });
    expect(wrapper.find(`[data-test="title"]`).text()).toBe(capitalizeFirstLetter(propsData.pizza.name));
  });

  // Список элементов для тестирования
  /*
    <li>{{ sizeRussian }}, {{ doughText }}</li>
    <li>Соус: {{ sauceRussian }}</li>
    <li>Начинка: {{ fillingRussian }}</li>
    <ItemCounter
      :name="`cart-list`"
      :value="pizza.quantity"
     @plusOne="plusOnePizza()"
    @minusOne="minusOnePizza()"
    <b>{{ pizzaSubSum }} ₽</b>
    @click="changePizza"
 */
});

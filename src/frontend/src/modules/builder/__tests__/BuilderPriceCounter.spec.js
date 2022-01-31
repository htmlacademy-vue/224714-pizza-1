import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";
import { createLocalVue, mount } from "@vue/test-utils";
import { addPizzas, generateMockStore } from "@/store/mocks";
import pizzas from "@/store/mocks/pizzas.json";
import VueRouter from "vue-router";

const localVue = createLocalVue();
const router = new VueRouter();

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;
  let actions;

  let propsData = {
    isBtnActive: true,
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    propsData.isBtnActive = true;
    actions = {
      Cart: {
        addPizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("p has correct price", () => {
    addPizzas(store, pizzas);
    createComponent({ store, propsData });
    const priceElement = wrapper.find('[data-test="price"]');
    expect(priceElement.text()).toContain(
      `Итого: ${store.getters["Builder/price"]}`
    );
  });

  it("btn disabled due to props isBtnActive", () => {
    propsData.isBtnActive = false;
    addPizzas(store, pizzas);
    createComponent({ store, propsData });
    const btn = wrapper.find('[data-test="btn"]');
    expect(btn.attributes("disabled")).toBeTruthy();
  });

  it("btn click dispatch Cart/addPizza", async () => {
    addPizzas(store, pizzas);
    createComponent({ store, mocks, propsData });
    const btn = wrapper.find('[data-test="btn"]');
    await btn.trigger("click");
    expect(actions.Cart.addPizza).toHaveBeenCalled();
  });

  it("btn 'Готовьте' makes redirect to Cart", async () => {
    createComponent({ store, mocks, propsData });
    const btn = wrapper.find('[data-test="btn"]');
    await btn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: `Cart` });
  });
});

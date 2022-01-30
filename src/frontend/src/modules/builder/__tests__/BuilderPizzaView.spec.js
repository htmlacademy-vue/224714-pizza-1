import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { addPizzas, generateMockStore, loadPizza } from "@/store/mocks";
import pizzas from "@/store/mocks/pizzas.json";
import AppDrop from "@/components/AppDrop";
import BuilderFillingItemVisualization from "@/modules/builder/BuilderFillingItemVisualization";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем к нему глобальный компонент AppIcon.
localVue.component("AppDrop", AppDrop);
localVue.component(
  "BuilderFillingItemVisualization",
  BuilderFillingItemVisualization
);
localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        plusOneIngredient: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("div has correct css class", () => {
    loadPizza(store, pizzas[0]);
    createComponent({ store });
    const pizzaDiv = wrapper.find(`[data-test="pizza"]`);
    expect(pizzaDiv.classes()).toContain(`pizza--foundation--small-tomato`);
  });

  it("dispatch Builder/plusOneIngredient on drop event", async () => {
    createComponent({ store });
    const transferData = { id: 1 };
    const appDrop = wrapper.findComponent({ ref: "app-drop" });
    await appDrop.vm.$emit("drop", transferData);
    expect(actions.Builder.plusOneIngredient).toHaveBeenCalledWith(
      expect.any(Object),
      transferData.id
    );
  });

  it("renders correct number of BuilderFillingItemVisualization", () => {
    loadPizza(store, pizzas[0]);
    createComponent({ store, localVue });
    const fillingItems = wrapper.findAllComponents(BuilderFillingItemVisualization);
    const itemsQuantity = Object.keys(pizzas[0].filling).length;
    expect(fillingItems).toHaveLength(itemsQuantity);
  });
});

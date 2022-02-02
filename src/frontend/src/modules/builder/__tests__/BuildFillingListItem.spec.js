import BuildFillingListItem from "@/modules/builder/BuildFillingListItem";
import { mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";

describe("BuildFillingListItem", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuildFillingListItem, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        plusOneIngredient: jest.fn(),
        minusOneIngredient: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("counter plus one click dispatch Builder/plusOneIngredient", () => {
    const ingredientItem = store.getters["Builder/ingredients"][0];
    const propsData = {
      ingredient: ingredientItem,
    };
    createComponent({ propsData, store });
    const counter = wrapper.find(`[data-test="counter"]`);
    counter.vm.$emit("plusOne");
    expect(actions.Builder.plusOneIngredient).toHaveBeenCalledWith(
      expect.any(Object),
      ingredientItem.id
    );
  });

  it("counter plus one click dispatch Builder/minusOneIngredient", () => {
    const ingredientItem = store.getters["Builder/ingredients"][0];
    const propsData = {
      ingredient: ingredientItem,
    };
    createComponent({ propsData, store });
    const counter = wrapper.find(`[data-test="counter"]`);
    counter.vm.$emit("minusOne");
    expect(actions.Builder.minusOneIngredient).toHaveBeenCalledWith(
      expect.any(Object),
      ingredientItem.id
    );
  });
});

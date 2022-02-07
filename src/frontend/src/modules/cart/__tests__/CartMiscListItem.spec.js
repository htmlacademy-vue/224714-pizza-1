import CartMiscListItem from "@/modules/cart/CartMiscListItem";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, addMiscs } from "@/store/mocks";
import misc from "@/static/misc.json";

const localVue = createLocalVue();

describe("CartMiscListItem", () => {
  let wrapper;
  let store;
  let actions;

  const propsData = {
    miscItem: misc[0],
  };

  const createComponent = (options) => {
    wrapper = mount(CartMiscListItem, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        plusOneMiscItem: jest.fn(),
        minusOneMiscItem: jest.fn(),
      },
    };
    store = generateMockStore(actions);
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
    expect(wrapper.find(`[data-test="total"]`).text()).toBe(
      `${propsData.miscItem.price * 2} ₽`
    );
  });

  it("counter plus one click dispatch Cart/plusOneMiscItem", async () => {
    createComponent({ propsData, store });
    const counter = wrapper.find(`[data-test="counter"]`);
    counter.vm.$emit("plusOne");
    expect(actions.Cart.plusOneMiscItem).toHaveBeenCalled();
  });

  it("counter plus one click dispatch Cart/minusOneMiscItem", async () => {
    createComponent({ propsData, store });
    const counter = wrapper.find(`[data-test="counter"]`);
    await counter.vm.$emit("minusOne");
    expect(actions.Cart.minusOneMiscItem).toHaveBeenCalled();
  });
});

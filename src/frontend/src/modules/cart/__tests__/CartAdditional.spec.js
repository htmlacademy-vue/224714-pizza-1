import CartAdditional from "@/modules/cart/CartAdditional";
import CartMiscListItem from "@/modules/cart/CartMiscListItem";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import misc from "@/static/misc.json";

const localVue = createLocalVue();
localVue.component("CartMiscListItem", CartMiscListItem);

describe("AppLayoutHeader", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartAdditional, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render right amount of misc items", async () => {
    createComponent({ localVue, store });
    const miscItems = wrapper.findAll("[data-test='misc-item']");
    expect(miscItems).toHaveLength(misc.length);
  });
});

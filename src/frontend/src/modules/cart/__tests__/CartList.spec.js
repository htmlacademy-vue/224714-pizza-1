import CartList from "@/modules/cart/CartList";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import VueRouter from "vue-router";
import { actions } from "@/store";

const localVue = createLocalVue();
const router = new VueRouter();

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


});

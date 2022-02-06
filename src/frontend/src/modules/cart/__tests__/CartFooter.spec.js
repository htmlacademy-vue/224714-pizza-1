import CartFooter from "@/modules/cart/CartFooter";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import VueRouter from "vue-router";

const localVue = createLocalVue();
const router = new VueRouter();

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

describe("CartFooter", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        resetState: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("button 'хочу ещё одну' makes redirect to main", async () => {
    createComponent({ localVue, store, mocks });
    const button = wrapper.find(`[data-test="one-more"]`);
    await button.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith(`/`);
  });

  it("button 'хочу ещё одну' makes resetState", async () => {
    createComponent({ localVue, store, mocks, actions });
    const button = wrapper.find(`[data-test="one-more"]`);
    await button.trigger("click");
    expect(actions.Builder.resetState).toHaveBeenCalled();
  });
});

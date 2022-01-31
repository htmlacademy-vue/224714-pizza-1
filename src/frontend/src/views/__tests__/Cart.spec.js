import Cart from "@/views/Cart";
import { mount } from "@vue/test-utils";
import {
  addPizzas,
  authenticateUser,
  generateMockStore,
  showPopup,
} from "@/store/mocks";
import pizzas from "@/store/mocks/pizzas.json";
import { setOrders } from "@/store/mocks";
import orders from "@/store/mocks/orders.json";

describe("Cart", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        post: jest.fn(),
      },
      Cart: {
        toggleSuccessPopup: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  // it("form submit dispatch Orders/post", async () => {
  //   authenticateUser(store);
  //   setOrders(store, orders);
  //   createComponent({ store });
  //   const form = wrapper.find(`[data-test="form"]`);
  //   await form.trigger("submit");
  //   expect(actions.Orders.post).toHaveBeenCalled();
  // });

  it("empty block shows when cart empty", async () => {
    createComponent({ store });
    const empty = wrapper.find(`[data-test="empty"]`);
    expect(empty.exists()).toBe(true);
  });

  it("empty block shows when cart empty", async () => {
    authenticateUser(store);
    addPizzas(store, pizzas);
    createComponent({ store });
    const notEmpty = wrapper.find(`[data-test="not-empty"]`);
    expect(notEmpty.exists()).toBe(true);
  });

  it("popup shows due to Cart state isSuccessPopupShown", async () => {
    authenticateUser(store);
    showPopup(store, true);
    createComponent({ store });
    const popup = wrapper.find(`[data-test="popup"]`);
    expect(popup.exists()).toBe(true);
  });
});

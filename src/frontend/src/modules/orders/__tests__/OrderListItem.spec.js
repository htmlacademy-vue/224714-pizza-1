import OrderListItem from "@/modules/orders/OrderListItem";
import { mount } from "@vue/test-utils";
import { authenticateUser, generateMockStore, setOrders } from "@/store/mocks";

import orders from "@/store/mocks/orders.json";

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

describe("OrderListItem", () => {
  let wrapper;
  let store;
  let actions;

  const propsData = {
    order: {
      id: 1,
      total: 800,
      orderPizzas: [
        {
          name: "sdfasfa",
          sauce: "Томатный",
          dough: "на тонком тесте",
          size: "45 см",
          ingredients: "Лосось",
          price: 800,
          quantity: 1,
        },
      ],
      orderAddress: {
        id: 1,
        name: "ул.Trol, д.22, кв.22",
        street: "Trol",
        building: "22",
        flat: "22",
        comment: "",
        userId: "4f1cdc0d-73bd-4941-badc-385aadc58c75",
      },
    },
  };

  const createComponent = (options) => {
    wrapper = mount(OrderListItem, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        delete: jest.fn(),
      },
      Cart: {
        addPizzas: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders order number", () => {
    authenticateUser(store);
    createComponent({ store, propsData });
    const number = wrapper.find(`[data-test="number"]`);
    expect(number.text()).toContain(propsData.order.id);
  });

  it("renders order sum", () => {
    authenticateUser(store);
    createComponent({ store, propsData });
    const sum = wrapper.find(`[data-test="sum"]`);
    expect(sum.text()).toContain(propsData.order.total);
  });

  it("remove btn dispatch Orders/delete", () => {
    authenticateUser(store);
    createComponent({ store, propsData });
    const btn = wrapper.find(`[data-test="remove-btn"]`);
    btn.trigger("click");
    expect(actions.Orders.delete).toHaveBeenCalledWith(
      expect.any(Object),
      propsData.order.id
    );
  });

  it("repeat-btn dispatch Cart/addPizzas and redirect to Cart", async () => {
    authenticateUser(store);
    setOrders(store, orders);
    createComponent({ store, propsData, mocks });
    const btn = wrapper.find(`[data-test="repeat-btn"]`);
    await btn.trigger("click");
    expect(actions.Cart.addPizzas).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: `Cart` });
  });
});

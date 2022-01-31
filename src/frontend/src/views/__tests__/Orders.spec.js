import Orders from "@/views/Orders";
import { mount } from "@vue/test-utils";
import { generateMockStore, setOrders } from "@/store/mocks";
import orders from "@/store/mocks/orders.json";

describe("Orders", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render correct number of order-list-items", async () => {
    createComponent({ store });
    await setOrders(store, orders);
    const listItems = wrapper.findAll(`[data-test="order-list-item"]`);
    expect(listItems).toHaveLength(store.state.Orders.orders.length);
  });
});

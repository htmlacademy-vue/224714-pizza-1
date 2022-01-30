import OrderListItem from "@/modules/orders/OrderListItem";
import { mount } from "@vue/test-utils";
import {
  addPizzas,
  authenticateUser,
  generateMockStore,
  setOrders,
} from "@/store/mocks";
import Cart from "@/views/Cart";
import pizzas from "@/store/mocks/pizzas.json";

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
    setOrders(store, [
      {
        id: 1,
        phone: 234234234224,
        userId: "4f1cdc0d-73bd-4941-badc-385aadc58c75",
        addressId: 1,
        orderPizzas: [
          {
            id: 1,
            name: "sdfasfa",
            quantity: 1,
            sauceId: 1,
            doughId: 1,
            sizeId: 2,
            orderId: 1,
            ingredients: [
              {
                id: 1,
                quantity: 1,
                pizzaId: 1,
                ingredientId: 4,
              },
            ],
          },
        ],
        orderAddress: {
          id: 1,
          name: "ул.Trol, д.22, кв.22",
          street: "Trol",
          building: 22,
          flat: 22,
          comment: "",
          userId: "4f1cdc0d-73bd-4941-badc-385aadc58c75",
        },
      },
    ]);
    createComponent({ store, propsData, mocks });
    const btn = wrapper.find(`[data-test="repeat-btn"]`);
    await btn.trigger("click");
    expect(actions.Cart.addPizzas).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: `Cart` });
  });
});

/*



        v-for="(pizza, i) in order.orderPizzas" amount
         :alt="pizza.name"
         <h2 data-test="pizza-name">{{ pizza.name }}</h2>
         {{ pizza.size }},
                {{ pizza.dough }}
              <li data-test="sauce">Соус: {{ pizza.sauce }}</li>
              <li data-test="ingredients">Начинка: {{ pizza.ingredients }}</li>
                    <li v-for="(misc, i) in order.orderMisc" :key="i">
                     :src="misc.image"
                    :alt="misc.name"
                              <span data-test="misc-name">{{ misc.name }}</span>
                                        <b data-test="misc-price">{{ misc.price }} ₽</b>
    <p class="order__address" data-test="address">


 */

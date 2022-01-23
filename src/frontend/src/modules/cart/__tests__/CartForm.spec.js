import CartForm from "@/modules/cart/CartForm";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, authenticateUser } from "@/store/mocks";
import VueRouter from "vue-router";
import { actions } from "@/store";

const localVue = createLocalVue();
const router = new VueRouter();

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $route: {
    path: "/",
  },
};

describe("CartForm", () => {
  let wrapper;
  let store;
  let actions;

  let isExtraFieldsRequired = true;
  const propsData = {
    validations: {
      phone: {
        error: "",
        rules: ["required"],
      },
      street: {
        error: "",
        rules: [isExtraFieldsRequired],
      },
      building: {
        error: "",
        rules: [isExtraFieldsRequired],
      },
      flat: {
        error: "",
        rules: [isExtraFieldsRequired],
      },
    },
  };

  const createComponent = (options) => {
    wrapper = mount(CartForm, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        setAddressOption: jest.fn(),
        setAddress: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("change delivery makes resetState setAddressOption", async () => {
    authenticateUser(store);
    createComponent({ propsData, localVue, store, mocks, actions });
    const button = wrapper.find(`[data-test="delivery-select"]`);
    await button.trigger("change");
    expect(actions.Cart.setAddressOption).toHaveBeenCalled();
    expect(actions.Cart.setAddress).toHaveBeenCalled();
  });
});

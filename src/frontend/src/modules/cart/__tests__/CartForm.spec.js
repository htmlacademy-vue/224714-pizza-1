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

  it("change delivery makes setAddress and setAddressOption", async () => {
    authenticateUser(store);
    createComponent({ propsData, localVue, store, mocks, actions });
    const select = wrapper.find(`[data-test="delivery-select"]`);
    await select.trigger("change");
    expect(actions.Cart.setAddressOption).toHaveBeenCalled();
    expect(actions.Cart.setAddress).toHaveBeenCalled();
  });

  it("change delivery dispatch current select value in setAddressOption", async () => {
    authenticateUser(store);
    createComponent({ propsData, localVue, store, mocks, actions });
    const options = wrapper.find(`[data-test="delivery-select"]`).findAll('option');
    await options.at(1).setSelected();
    const selectedOption = wrapper.find('option:checked').element.value;
    expect(actions.Cart.setAddressOption).toHaveBeenCalledWith(
      expect.any(Object),
      selectedOption
    );
  });
});

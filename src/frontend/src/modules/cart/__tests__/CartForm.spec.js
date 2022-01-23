import CartForm from "@/modules/cart/CartForm";
import { mount, createLocalVue } from "@vue/test-utils";
import {
  generateMockStore,
  authenticateUser,
  setAddressOption,
  setPhone,
  setAddresses,
} from "@/store/mocks";
import VueRouter from "vue-router";
import { defaultAddressOptions, NEW_ADDRESS_OPTION } from "@/common/const";

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
        setPhone: jest.fn(),
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
    const options = wrapper
      .find(`[data-test="delivery-select"]`)
      .findAll("option");
    await options.at(1).setSelected();
    const selectedOption = wrapper.find("option:checked").element.value;
    expect(actions.Cart.setAddressOption).toHaveBeenCalledWith(
      expect.any(Object),
      selectedOption
    );
  });

  it("displays correct number of address options when no address saved", () => {
    expect(
      wrapper.find(`[data-test="delivery-select"]`).findAll("option").length
    ).toBe(2);
  });

  it("render new address form when option new address checked", async () => {
    authenticateUser(store);
    setAddressOption(store, "2");
    createComponent({ propsData, localVue, store, mocks, actions });
    const newAddressForm = wrapper.find(`[data-test="new-address"]`);
    expect(newAddressForm.exists()).toBe(true);
  });

  it("select value equals addressOption from Cart Store", async () => {
    authenticateUser(store);
    setAddressOption(store, "2");
    createComponent({ propsData, localVue, store, mocks, actions });
    expect(wrapper.find(`[data-test="delivery-select"]`).element.value).toBe(
      "2"
    );
  });

  it("phone value equals phone state from Cart Store", async () => {
    setPhone(store, "123");
    createComponent({ propsData, localVue, store, mocks, actions });
    expect(wrapper.find(`[data-test="phone"]`).element.value).toBe("123");
  });

  it("disable input for loaded addresses", async () => {
    authenticateUser(store);
    await setAddresses(store);
    setAddressOption(store, defaultAddressOptions.length + 1);
    createComponent({ propsData, localVue, store, mocks, actions });
    expect(wrapper.find(`[data-test="street"]`).attributes("disabled")).toBe(
      "disabled"
    );
  });
  it("phone input calls setPhone action", async () => {
    createComponent({ propsData, localVue, store, mocks, actions });
    const phoneInput = wrapper.find(`[data-test="phone"]`);
    phoneInput.element.value = "79231271111";
    await phoneInput.trigger("input");
    expect(actions.Cart.setPhone).toHaveBeenCalled();
  });
});

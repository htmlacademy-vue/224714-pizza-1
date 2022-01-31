import Cart from "@/views/Cart";
import { mount } from "@vue/test-utils";
import {
  authenticateUser,
  generateMockStore,
  setFormStatus,
} from "@/store/mocks";
import { addressFormStatus } from "@/common/const";

describe("Cart", () => {
  let wrapper;
  let store;
  let actions;

  const propsData = {};

  const createComponent = (options) => {
    wrapper = mount(ProfileForm, options);
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

  // it("form submit dispatch Addresses/editAddress with edit form status", async () => {
  //   authenticateUser(store);
  //   setFormStatus(store, addressFormStatus.EDIT);
  //   createComponent({ store, propsData });
  //   const form = wrapper;
  //   await form.trigger("submit");
  //   expect(actions.Addresses.editAddress).toHaveBeenCalledWith(
  //     expect.any(Object),
  //     propsData.newAddress
  //   );
  // });
});

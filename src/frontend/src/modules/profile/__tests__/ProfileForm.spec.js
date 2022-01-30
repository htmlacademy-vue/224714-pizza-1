import ProfileForm from "@/modules/profile/ProfileForm";
import { mount } from "@vue/test-utils";
import {
  authenticateUser,
  generateMockStore,
  setFormStatus,
} from "@/store/mocks";
import { addressFormStatus } from "@/common/const";

describe("ProfileForm", () => {
  let wrapper;
  let store;
  let actions;

  const propsData = {
    editableAddressId: 1,
    addressIndex: 1,
    userId: "4f1cdc0d-73bd-4941-badc-385aadc58c75",
    newAddress: {
      id: 1,
      name: "ул.Trol, д.22, кв.22",
      street: "Trol",
      building: "22",
      flat: "22",
      comment: "abc",
      userId: "4f1cdc0d-73bd-4941-badc-385aadc58c75",
    },
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileForm, options);
  };

  beforeEach(() => {
    actions = {
      Addresses: {
        removeAddress: jest.fn(),
        editAddress: jest.fn(),
        addAddress: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("form submit dispatch Addresses/editAddress with edit form status", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.EDIT);
    createComponent({ store, propsData });
    const form = wrapper;
    await form.trigger("submit");
    expect(actions.Addresses.editAddress).toHaveBeenCalledWith(
      expect.any(Object),
      propsData.newAddress
    );
  });

  it("form submit dispatch Addresses/addAddress with new form status", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.NEW);
    createComponent({ store, propsData });
    const form = wrapper;
    await form.trigger("submit");
    expect(actions.Addresses.addAddress).toHaveBeenCalledWith(
      expect.any(Object),
      propsData.newAddress
    );
  });

  it("form submit emits closeForm", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.NEW);
    createComponent({ store, propsData });
    const form = wrapper;
    await form.trigger("submit");
    expect(wrapper.emitted().closeForm).toBeTruthy();
  });

  it("removeAddress emits closeForm", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.EDIT);
    createComponent({ store, propsData });
    const btn = wrapper.find(`[data-test="remove"]`);
    await btn.trigger("click");
    expect(wrapper.emitted().closeForm).toBeTruthy();
  });

  it("form hidden when form status closed", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.CLOSED);
    createComponent({ store, propsData });
    expect(wrapper.isVisible()).toBe(false);
  });

  it("input address name has correct value", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.EDIT);
    createComponent({ store, propsData });
    const input = wrapper.find(`[data-test="address-name"]`);
    expect(input.element.value).toBe(propsData.newAddress.name);
  });

  it("input street has correct value", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.EDIT);
    createComponent({ store, propsData });
    const input = wrapper.find(`[data-test="street"]`);
    expect(input.element.value).toBe(propsData.newAddress.street);
  });

  it("input building has correct value", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.EDIT);
    createComponent({ store, propsData });
    const input = wrapper.find(`[data-test="building"]`);
    expect(input.element.value).toBe(propsData.newAddress.building);
  });

  it("input flat has correct value", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.EDIT);
    createComponent({ store, propsData });
    const input = wrapper.find(`[data-test="flat"]`);
    expect(input.element.value).toBe(propsData.newAddress.flat);
  });

  it("input comment has correct value", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.EDIT);
    createComponent({ store, propsData });
    const input = wrapper.find(`[data-test="comment"]`);
    expect(input.element.value).toBe(propsData.newAddress.comment);
  });

  // it("btn remove not visible when not editing", () => {
  //   authenticateUser(store);
  //   setFormStatus(store, addressFormStatus.NEW);
  //   createComponent({ store, propsData });
  //   const btn = wrapper.find(`[data-test="remove"]`);
  //   expect(btn.isEmpty()).toBe(true)
  // });

  it("btn remove is visible when editing", () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.EDIT);
    createComponent({ store, propsData });
    const btn = wrapper.find(`[data-test="remove"]`);
    expect(btn.isVisible()).toBe(true);
  });
});

/*

                  @click="removeAddress" удалить
                   @click="$emit('closeForm')" отменить

                         this.$emit("closeForm");
 */

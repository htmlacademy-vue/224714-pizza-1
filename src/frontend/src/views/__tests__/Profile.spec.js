import Profile from "@/views/Profile";
import { mount } from "@vue/test-utils";
import {
  authenticateUser,
  generateMockStore,
  setAddresses,
  setFormStatus,
} from "@/store/mocks";
import user from "@/static/user.json";
import addresses from "@/store/mocks/addresses.json";
import { addressFormStatus } from "@/common/const";

const propsData = {
  newAddress: {
    id: 1,
  },
};

describe("Profile", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    actions = {
      Addresses: {
        getAddresses: jest.fn(),
        setFormStatus: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders source srcset attribute", async () => {
    authenticateUser(store);
    createComponent({ store });
    const source = wrapper.find(`[data-test="source"]`);
    expect(source.attributes("srcset")).toBe(user.avatar);
  });

  it("renders img attributes", async () => {
    authenticateUser(store);
    createComponent({ store });
    const img = wrapper.find(`[data-test="image"]`);
    expect(img.attributes("src")).toBe(user.avatar);
    expect(img.attributes("srcset")).toBe(user.avatar);
    expect(img.attributes("alt")).toBe(user.name);
  });

  it("renders user name", async () => {
    authenticateUser(store);
    createComponent({ store });
    const name = wrapper.find(`[data-test="user-name"]`);
    expect(name.text()).toBe(user.name);
  });

  it("renders user phone", async () => {
    authenticateUser(store);
    createComponent({ store });
    const phone = wrapper.find(`[data-test="user-phone"]`);
    expect(phone.text()).toBe(user.phone);
  });

  it("renders correct number address items", async () => {
    authenticateUser(store);
    await setAddresses(store);
    createComponent({ store });
    const addressItems = wrapper.findAll(`[data-test="address"]`);
    expect(addressItems).toHaveLength(addresses.length);
  });

  it("renders correct address name, full address and comment ", async () => {
    authenticateUser(store);
    await setAddresses(store);
    createComponent({ store });
    const addressName = wrapper.findAll(`[data-test="address-name"]`).at(0);
    const addressFull = wrapper.findAll(`[data-test="address-full"]`).at(0);
    const addressComment = wrapper.findAll(`[data-test="comment"]`).at(0);
    expect(addressName.text()).toBe(`Адрес №1. ${addresses[0].name}`);
    expect(addressFull.text()).toBe(
      `${addresses[0].street}, д. ${addresses[0].building}, кв.
        ${addresses[0].flat}`
    );
    expect(addressComment.text()).toBe(addresses[0].comment);
  });

  it("profile form on closeForm dispatch Addresses/setFormStatus", async () => {
    authenticateUser(store);
    createComponent({ store });
    const profileForm = wrapper.find(`[data-test="profile-form"]`);
    await profileForm.vm.$emit("closeForm");
    expect(actions.Addresses.setFormStatus).toHaveBeenCalledWith(
      expect.any(Object),
      addressFormStatus.CLOSED
    );
  });

  it("btn Добавить новый адрес has disabled attribute", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.EDIT);
    createComponent({ store });
    const btn = wrapper.find(`[data-test="new-address-btn"]`);
    expect(btn.attributes("disabled")).toBe("disabled");
  });

  it("btn Добавить новый адрес click dispatch Addresses/setFormStatus", async () => {
    authenticateUser(store);
    setFormStatus(store, addressFormStatus.CLOSED);
    createComponent({ store });
    const btn = wrapper.find(`[data-test="new-address-btn"]`);
    await btn.trigger("click");
    expect(actions.Addresses.setFormStatus).toHaveBeenCalledWith(
      expect.any(Object),
      addressFormStatus.NEW
    );
  });

  it("btn Изменить адрес click dispatch Addresses/setFormStatus", async () => {
    authenticateUser(store);
    setAddresses(store);
    createComponent({ store });
    const btn = wrapper.findAll(`[data-test="change-btn"]`).at(0);
    await btn.trigger("click");
    expect(actions.Addresses.setFormStatus).toHaveBeenCalledWith(
      expect.any(Object),
      addressFormStatus.EDIT
    );
  });
});

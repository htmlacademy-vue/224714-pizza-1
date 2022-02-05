import Popup from "@/modules/cart/Popup";
import { mount } from "@vue/test-utils";
import { authenticateUser, generateMockStore } from "@/store/mocks";

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

describe("Popup", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(Popup, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        toggleSuccessPopup: jest.fn(),
        resetState: jest.fn(),
      },
      Builder: {
        resetState: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
    mocks.$router.push = jest.fn();
  });

  it("btn Закрыть попап dispatch Cart/toggleSuccessPopup Builder/resetState Cart/resetState", async () => {
    createComponent({ store, mocks });
    const btn = wrapper.find(`[data-test="btn-close"]`);
    btn.trigger("click");
    expect(actions.Cart.toggleSuccessPopup).toHaveBeenCalledWith(
      expect.any(Object),
      false
    );
    expect(actions.Builder.resetState).toHaveBeenCalled();
    expect(actions.Cart.resetState).toHaveBeenCalled();
  });

  it("btn Отлично, я жду! dispatch Cart/toggleSuccessPopup Builder/resetState Cart/resetState", async () => {
    createComponent({ store, mocks });
    const btn = wrapper.find(`[data-test="btn-wait"]`);
    btn.trigger("click");
    expect(actions.Cart.toggleSuccessPopup).toHaveBeenCalledWith(
      expect.any(Object),
      false
    );
    expect(actions.Builder.resetState).toHaveBeenCalled();
    expect(actions.Cart.resetState).toHaveBeenCalled();
  });

  it("btn Закрыть попап dispatch Cart/toggleSuccessPopup Builder/resetState Cart/resetState not auth.", async () => {
    createComponent({ store, mocks });
    const btn = wrapper.find(`[data-test="btn-close"]`);
    btn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({ path: `/` });
  });

  it("btn Закрыть попап dispatch Cart/toggleSuccessPopup Builder/resetState Cart/resetState not auth.", async () => {
    authenticateUser(store);
    createComponent({ store, mocks });
    const btn = wrapper.find(`[data-test="btn-close"]`);
    btn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({ path: `/orders` });
  });

  it("btn Отлично, я жду! dispatch Cart/toggleSuccessPopup Builder/resetState Cart/resetState not auth.", async () => {
    createComponent({ store, mocks });
    const btn = wrapper.find(`[data-test="btn-wait"]`);
    btn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({ path: `/` });
  });

  it("btn Отлично, я жду! dispatch Cart/toggleSuccessPopup Builder/resetState Cart/resetState not auth.", async () => {
    authenticateUser(store);
    createComponent({ store, mocks });
    const btn = wrapper.find(`[data-test="btn-wait"]`);
    btn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith({ path: `/orders` });
  });
});

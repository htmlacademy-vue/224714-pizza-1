import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import { generateMockStore, authenticateUser } from "@/store/mocks";

const localVue = createLocalVue();
const router = new VueRouter();

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $route: {
    path: "/",
  },
  $notifier: {
    success: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  },
};

const stubs = ["router-link"];

describe("AppLayoutHeader", () => {
  let wrapper;
  let actions;
  let store;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn(),
      },
      Cart: {
        resetState: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$notifier.success = jest.fn();
    mocks.$router.push = jest.fn();
    mocks.$route.path = "/";
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render price", () => {
    createComponent({ localVue, store, mocks, stubs });
    const priceElement = wrapper.find(`[data-test="price"]`);
    const price = store.getters["Cart/totalPrice"];
    expect(priceElement.text()).toBe(`${price} ₽`);
  });

  it("shows correct login link on main page", () => {
    createComponent({ localVue, store, mocks, stubs });
    const loginLink = wrapper.find(`[data-test="login-link"]`);
    expect(loginLink.attributes("to")).toBe("/loginmodal");
  });

  it("shows correct login link on other page", () => {
    mocks.$route = { path: "/abc" };
    createComponent({ localVue, store, mocks, stubs });
    const loginLink = wrapper.find(`[data-test="login-link"]`);
    expect(loginLink.attributes("to")).toBe("/login");
  });

  it("shows login block if not authenticated", () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(`[data-test="login-link"]`).element).toBeTruthy();
  });

  it("shows user block if authenticated", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(`[data-test="header__user"]`).element).toBeTruthy();
  });

  it("shows user avatar picture if authenticated", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(`[data-test="user-avatar"]`).attributes("src")).toBe(
      store.state.Auth.user.avatar
    );
    expect(wrapper.find(`[data-test="user-avatar"]`).attributes("srcset")).toBe(
      store.state.Auth.user.avatar
    );
  });

  it("shows user name if authenticated", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.find(`[data-test="user-name"]`).text()).toBe(
      store.state.Auth.user.name
    );
  });

  it("logout button makes redirect to main", async () => {
    authenticateUser(store);
    mocks.$route = { path: "/abc" };
    createComponent({ localVue, store, mocks, stubs });
    const button = wrapper.find(`[data-test="header__logout"]`);
    await button.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("logout button makes logout", async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const button = wrapper.find(`[data-test="header__logout"]`);
    await button.trigger("click");
    expect(actions.Auth.logout).toHaveBeenCalled();
  });

  it("logout button resets cart state", async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const button = wrapper.find(`[data-test="header__logout"]`);
    await button.trigger("click");
    expect(actions.Cart.resetState).toHaveBeenCalled();
  });
});

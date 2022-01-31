import Login from "@/views/Login";
import { mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import $validator from "@/common/mixins/validator";

const mocks = {
  $router: {
    push: jest.fn(),
    go: jest.fn(),
  },
  $route: {
    path: "/Login",
  },
  $validator,
};

const propsData = {
  email: "dd@ff.rr",
  password: "123",
};

describe("Login", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        login: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
    mocks.$route.path = "/Login";
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("form submit dispatch Auth/login", async () => {
    createComponent({ store, mocks });
    const form = wrapper.find(`[data-test="form"]`);
    const emailInput = wrapper.find('[data-test="email"]').find("input");
    const passInput = wrapper.find('[data-test="password"]').find("input");

    emailInput.element.value = "test@gmail.com";
    await emailInput.trigger("input");
    passInput.element.value = "123456";
    await passInput.trigger("input");

    await form.trigger("submit");
    expect(actions.Auth.login).toHaveBeenCalledWith(expect.any(Object), {
      email: "test@gmail.com",
      password: "123456",
    });
  });

  it("form submit redirect to main page", async () => {
    createComponent({ store, mocks });
    const form = wrapper.find(`[data-test="form"]`);
    const emailInput = wrapper.find('[data-test="email"]').find("input");
    const passInput = wrapper.find('[data-test="password"]').find("input");

    emailInput.element.value = "test@gmail.com";
    await emailInput.trigger("input");
    passInput.element.value = "123456";
    await passInput.trigger("input");

    await form.trigger("submit");
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("form submit redirect to main page", async () => {
    createComponent({ store, mocks });
    const form = wrapper.find(`[data-test="form"]`);
    const emailInput = wrapper.find('[data-test="email"]').find("input");
    const passInput = wrapper.find('[data-test="password"]').find("input");

    emailInput.element.value = "test@gmail.com";
    await emailInput.trigger("input");
    passInput.element.value = "123456";
    await passInput.trigger("input");

    await form.trigger("submit");
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("close forms redirect to previous page", async () => {
    createComponent({ store, mocks });
    const closeBtn = wrapper.find(`[data-test="close"]`);
    await closeBtn.trigger("click");
    expect(mocks.$router.go).toHaveBeenCalledWith(-1);
  });
});

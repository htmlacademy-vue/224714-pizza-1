import BuildFillingSelector from "@/modules/builder/BuildFillingSelector";
import { mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";

describe("BuildFillingSelector", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuildFillingSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders correct number of BuildFillingListItem", () => {
    createComponent({ store });
    const listItems = wrapper.findAll(`[data-test="list-item"]`);
    expect(listItems).toHaveLength(store.getters["Builder/ingredients"].length);
  });
});

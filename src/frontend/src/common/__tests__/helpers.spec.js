import {
  getNameById,
  getIngredientValueById,
  getValueById,
  getFillingArrayFromObject,
  calculateFilling,
  capitalizeFirstLetter,
  getAddressIndex,
} from "@/common/helpers";

describe("test helpers functions", () => {
  it("test getNameById", () => {
    expect(
      getNameById(
        [
          { id: 1, name: "ddd" },
          { id: 2, name: "ccc" },
        ],
        2
      )
    ).toBe("ccc");
  });

  it("test getIngredientValueById", () => {
    expect(
      getIngredientValueById(
        [
          { id: 2, name: "Грибы" },
          { id: 1, name: "Лосось" },
        ],
        2
      )
    ).toBe("mushrooms");
  });

  it("test getNameById", () => {
    expect(
      getValueById(
        [
          { id: 1, value: "ddd" },
          { id: 2, value: "ccc" },
        ],
        1
      )
    ).toBe("ddd");
  });

  it("test getFillingArrayFromObject", () => {
    expect(
      getFillingArrayFromObject({
        3: 1,
        4: 1,
      })
    ).toEqual([
      {
        ingredientId: "3",
        quantity: 1,
      },
      {
        ingredientId: "4",
        quantity: 1,
      },
    ]);
  });

  it("test calculateFilling", () => {
    expect(
      calculateFilling(
        {
          2: 2,
          3: 1,
          4: 1,
        },
        [
          {
            name: "Грибы",
            id: 1,
            price: 33,
            value: "mushrooms",
          },
          {
            name: "Чеддер",
            id: 2,
            price: 42,
            value: "cheddar",
          },
          {
            name: "Томаты",
            id: 3,
            price: 35,
            value: "tomatoes",
          },
          {
            name: "Лосось",
            id: 4,
            price: 50,
            value: "salmon",
          },
          {
            name: "Моцарелла",
            id: 5,
            price: 35,
            value: "mozzarella",
          },
          {
            name: "Салями",
            id: 6,
            price: 42,
            value: "salami",
          },
          {
            name: "Пармезан",
            id: 7,
            price: 35,
            value: "parmesan",
          },
          {
            name: "Блю чиз",
            id: 8,
            price: 50,
            value: "blue_cheese",
          },
          {
            name: "Маслины",
            id: 9,
            price: 25,
            value: "olives",
          },
          {
            name: "Чили",
            id: 10,
            price: 21,
            value: "chile",
          },
          {
            name: "Халапеньо",
            id: 11,
            price: 25,
            value: "jalapeno",
          },
          {
            name: "Лук",
            id: 12,
            price: 21,
            value: "onion",
          },
          {
            name: "Бекон",
            id: 13,
            price: 42,
            value: "bacon",
          },
          {
            name: "Ананас",
            id: 14,
            price: 25,
            value: "ananas",
          },
          {
            name: "Ветчина",
            id: 15,
            price: 42,
            value: "ham",
          },
        ],
        true
      )
    ).toBe(169);
  });

  it("test capitalizeFirstLetter", () => {
    expect(capitalizeFirstLetter("word")).toBe("Word");
    expect(capitalizeFirstLetter("hello world")).toBe("Hello world");
  });

  it("test getAddressIndex", () => {
    expect(getAddressIndex(1)).toBe(4);
  });
});

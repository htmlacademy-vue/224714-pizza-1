import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";

import resources from "@/common/enums/resources";
import { defaultAddressOptions } from "@/common/const";

export const doughMapEnglishByName = {
  ["Тонкое"]: "light",
  ["Толстое"]: "large",
};

export const doughCartTextMap = {
  ["Тонкое"]: "на тонком тесте",
  ["Толстое"]: "на толстом тесте",
};

export const doughClassMapping = {
  ["Тонкое"]: "small",
  ["Толстое"]: "big",
};

export const sizeMapEnglishByMultiplier = {
  1: "small",
  2: "normal",
  3: "big",
};

export const sauceMapEnglishByName = {
  ["Томатный"]: "tomato",
  ["Сливочный"]: "creamy",
};

export const ingredientMap = {
  ["Грибы"]: "mushrooms",
  ["Томаты"]: "tomatoes",
  ["Чеддер"]: "cheddar",
  ["Ветчина"]: "ham",
  ["Ананас"]: "ananas",
  ["Лосось"]: "salmon",
  ["Моцарелла"]: "mozzarella",
  ["Пармезан"]: "parmesan",
  ["Салями"]: "salami",
  ["Маслины"]: "olives",
  ["Бекон"]: "bacon",
  ["Блю чиз"]: "blue_cheese",
  ["Лук"]: "onion",
  ["Халапеньо"]: "jalapeno",
  ["Чили"]: "chile",
};

export const defaultPizzaCssClass = "pizza--foundation--small-tomato";

export const pizzaFillingMultipleClassMapping = {
  2: "pizza__filling--second",
  3: "pizza__filling--third",
};

export const getNameById = (array, id) => {
  return array.find((item) => +item.id === +id).name;
};

export const getIngredientValueById = (array, id) => {
  const ingredientRussianName = array.find((item) => +item.id === +id).name;
  return ingredientMap[ingredientRussianName];
};

export const getValueById = (array, id) => {
  return array.find((item) => +item.id === +id).value;
};

export const getFillingArrayFromObject = (fillingObject) => {
  return Object.entries(fillingObject).map((ingredient) => {
    return {
      ingredientId: ingredient[0],
      quantity: ingredient[1],
    };
  });
};

export const calculateFilling = (filling, ingredients, searchById = false) => {
  let fillingTotal = 0;
  if (filling === undefined) {
    return 0;
  }
  const searchProperty = searchById ? "id" : "value";
  Object.keys(filling).forEach((fillingItem) => {
    const fillingItemPrice = ingredients.find((ingredient) => {
      if (searchById) {
        return +ingredient[searchProperty] === +fillingItem;
      }
      return ingredient[searchProperty] === fillingItem;
    }).price;
    const fillingItemQuantity = filling[fillingItem];
    fillingTotal += fillingItemPrice * fillingItemQuantity;
  });
  return fillingTotal;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const deliveries = {
  1: "Заберу сам",
  2: "Новый адрес",
};

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export const defaultAddress = {
  name: "",
  userId: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
};

export const getAddressIndex = (index) => {
  return index + defaultAddressOptions.length + 1;
};

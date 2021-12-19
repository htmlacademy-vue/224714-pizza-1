import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";

import resources from "@/common/enums/resources";
import { defaultAddressOptions } from "@/common/const";

export const doughMap = [
  {
    name: "Тонкое",
    value: "light",
    id: 1,
  },
  {
    name: "Толстое",
    value: "large",
    id: 2,
  },
];

export const doughCartTextMap = {
  light: "на тонком тесте",
  large: "на толстом тесте",
};

export const sizeMap = [
  {
    multiplier: 1,
    value: "small",
    id: 1,
  },
  {
    multiplier: 3,
    value: "big",
    id: 2,
  },
  {
    multiplier: 2,
    value: "normal",
    id: 3,
  },
];

export const sizeTextMap = {
  small: "23 см",
  normal: "32 см",
  big: "45 см",
};

export const sauceMap = [
  {
    name: "Томатный",
    value: "tomato",
    id: 1,
  },
  {
    name: "Сливочный",
    value: "creamy",
    id: 2,
  },
];

export const ingredientMap = [
  { name: "Грибы", value: "mushrooms", id: 1 },
  { name: "Томаты", value: "tomatoes", id: 2 },
  { name: "Чеддер", value: "cheddar", id: 3 },
  { name: "Ветчина", value: "ham", id: 4 },
  { name: "Ананас", value: "ananas", id: 5 },
  { name: "Лосось", value: "salmon", id: 6 },
  { name: "Моцарелла", value: "mozzarella", id: 7 },
  { name: "Пармезан", value: "parmesan", id: 8 },
  { name: "Салями", value: "salami", id: 9 },
  { name: "Маслины", value: "olives", id: 10 },
  { name: "Бекон", value: "bacon", id: 11 },
  { name: "Блю чиз", value: "blue_cheese", id: 12 },
  { name: "Лук", value: "onion", id: 13 },
  { name: "Халапеньо", value: "jalapeno", id: 14 },
  { name: "Чили", value: "chile", id: 15 },
];

export const doughClassMapping = {
  light: "small",
  large: "big",
};

export const defaultPizzaCssClass = "pizza--foundation--small-tomato";

export const pizzaFillingMultipleClassMapping = {
  2: "pizza__filling--second",
  3: "pizza__filling--third",
};

export const getPropertyId = (array, id) => {
  return array.find((item) => +item.id === +id).id;
};

export const getNameById = (array, id) => {
  return array.find((item) => +item.id === +id).name;
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
  // store.dispatch("Auth/setAuthentication", true);
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

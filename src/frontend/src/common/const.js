import { defaultAddress } from "@/common/helpers";

export const FILLING_COUNTER_MIN_VALUE = 0;

export const FILLING_COUNTER_MAX_VALUE = 3;

/* eslint-disable */
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */

export const MESSAGE_LIVE_TIME = 3000; //ms

export const addressFormStatus = {
  CLOSED: "closed",
  EDIT: "edit",
  NEW: "new",
};

export const defaultAddressOptions = [
  {
    index: 1,
    text: "Заберу сам",
    address: {},
  },
  {
    index: 2,
    text: "Новый адрес",
    address: defaultAddress,
  },
];

export const DEFAULT_ADDRESS_OPTION = 1;

export const DEFAULT_SIZE_ARRAY_INDEX = 1;

export const DEFAULT_SAUCE_ARRAY_INDEX = 0;

export const DEFAULT_DOUGH_ARRAY_INDEX = 0;

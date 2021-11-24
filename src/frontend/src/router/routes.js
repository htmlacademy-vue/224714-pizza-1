export default [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
    meta: { layout: "AppLayoutMain" },
    children: [
      {
        path: "/login-modal", //отошел от ТЗ(/login) ради дочернего роута и отдельного шаблона
        components: {
          modal: () => import("@/views/LoginModal.vue"),
        },
        meta: { layout: "AppLayoutMain" },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
    meta: { layout: "AppLayoutMain" },
    children: [
      {
        path: "/thanks-popup",
        components: {
          modal: () => import("@/views/Popup.vue"),
        },
        meta: { layout: "AppLayoutMain" },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
    meta: { layout: "AppLayoutProfile" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: { layout: "AppLayoutProfile" },
  },
];

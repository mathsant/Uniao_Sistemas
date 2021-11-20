import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/home/Home";
import AdminPages from "../components/admin/AdminPages";
import Note from "../components/reports/Note";
import Auth from "../components/auth/Auth";
import CustomerReport from "../components/reports/CustomerReport";
import CustomersAdmin from "../components/admin/CustomersAdmin";
import CarrosAdmin from "../components/admin/CarrosAdmin";
import ServicesAdmin from "../components/admin/ServicesAdmin";
import ProvidersAdmin from "../components/admin/ProvidersAdmin";
import CollaboratorsAdmin from "../components/admin/CollaboratorsAdmin";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "customers",
      path: "/customers",
      component: CustomersAdmin,
    },
    {
      name: "cars",
      path: "/cars",
      component: CarrosAdmin,
    },
    {
      name: "services",
      path: "/services",
      component: ServicesAdmin,
    },
    {
      name: "providers",
      path: "/providers",
      component: ProvidersAdmin,
    },
    {
      name: "collaborators",
      path: "/collaborators",
      component: CollaboratorsAdmin,
    },
    {
      name: "note",
      path: "/note",
      component: Note,
    },
    {
      name: "reports",
      path: "/reports",
      component: CustomerReport,
    },
    {
      name: "auth",
      path: "/auth",
      component: Auth,
      meta: {
        publica: true,
      },
    },
  ],
});

function verSeTemToken() {
  return !!localStorage.getItem("token");
}

router.beforeEach((routeTo, routeFrom, next) => {
  if (!routeTo.meta.publica && !verSeTemToken()) {
    return next({ path: "/auth" });
  }
  next();
});

export default router;

import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
  iconPack: "fontawesome",
  duration: 1500,
});

Vue.toasted.register("defaultSuccess", "Operação realizada com sucesso", {
  type: "success",
  icon: "check",
});

Vue.toasted.register(
  "defaultError",
  (payload) =>
    !payload.msg.errors[0].message
      ? "Oops.. Erro inesperado."
      : payload.msg.errors[0].message,
  {
    type: "error",
    icon: "times",
  }
);

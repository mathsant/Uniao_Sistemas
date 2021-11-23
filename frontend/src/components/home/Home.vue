<template>
  <div class="home">
      <PageTitle icon="fa fa-home" main="Dashboard" sub="Página inicial" />
      <div class="stats">
        <Stat title="Colaboradores" :value="stat.amountCollaborators" icon="fa fa-users" color="#d54d50"/>
        <Stat title="Clientes" :value="stat.amountCustomers" icon="fa fa-user" color="#3bc480"/>
        <Stat title="Serviços" :value="stat.amountServices" icon="fa fa-cogs" color="#3282cd"/>
      </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Stat from "./Stat.vue";

export default {
  name: "Home",
  components: { PageTitle, Stat },
  data() {
    return {
      stat: {},
    };
  },
  methods: {
    getStats() {
      this.$http
        .get(`/`)
        .then((res) => (this.stat = res.data))
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getStats();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>

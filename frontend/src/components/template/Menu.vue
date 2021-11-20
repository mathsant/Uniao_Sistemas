<template>
  <aside class="menu-side" v-show="isMenuVisible">
    <header>União Sistemas</header>
    <ul>
      <li><router-link to="/"><i class="fa fa-home"></i> Home</router-link></li>
      <li><router-link to="/customers"><i class="fa fa-user"></i> Clientes</router-link></li>
      <li><router-link to="/cars"><i class="fa fa-car"></i> Automóveis</router-link></li>
      <li><router-link to="/services"><i class="fa fa-cogs"></i> Serviços</router-link></li>
      <li><router-link to="/providers"><i class="fa fa-address-book"></i> Fornecedores</router-link></li>
      <li><router-link to="/collaborators"><i class="fa fa-users"></i> Colaboradores</router-link></li>
      <li><router-link to="/note"><i class="fa fa-envelope-square"></i> Nota branca</router-link></li>
      <li><router-link to="/reports"><i class="fa fa-sticky-note"></i> Relatorio de Serviços</router-link></li>
    </ul>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import Tree from "liquor-tree";

export default {
  name: "Menu",
  components: { Tree },
  computed: mapState(["isMenuVisible"]),
};
</script>

<style>
.menu-side {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu-side header {
  font-size: 22px;
  color: white;
  text-align: center;
  line-height: 70px;
  background: #414345;
  user-select: none;
}

.menu-side a {
  margin-top: 10px;
  margin-bottom: 12px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  padding-left: 10px;
}

.menu-side ul a {
  display: block;
  height: 100%;
  width: 100%;
  line-height: 65px;
  font-size: 20px;
  color: white;
  padding-left: 15px;
  box-sizing: border-box;
  transition: 0.4s;
}

.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
}
</style>

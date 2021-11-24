<template>
  <div class="customer-admin">
    <page-title :icon="'fa fa-user'" main="Usuários" sub="Controle de usuários" />
      <b-form> 
        <input id="user-id" type="hidden" v-model="user.id" />
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="E-mail:" label-for="user-email">
              <b-form-input id="user-email" type="email" v-model="user.email" placeholder="Informe o e-mail do usuario..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Alterar senha:" label-for="user-password">
              <b-form-input id="user-password" type="password" v-model="user.password" placeholder="Digite a senha do usuário..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Confirme a senha:" label-for="user-confirm-cpf">
              <b-form-input id="user-confirm-password" type="password" v-model="user.pass" placeholder="Confirme a senha do usuário..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="success" v-if="mode === 'save'" @click="save">Salvar</b-button>
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <br>
        <b-input-group prepend="Pesquisar..." class="mt-3">
          <b-form-input v-model="filter" type="search" placeholder="Pesquisa de usuarios..."></b-form-input>
        </b-input-group>
      <br>
        <b-table hover striped :items="users" :fields="fields" :filter="filter">
          <template slot="actions" slot-scope="data">
            <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
              <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadUser(data.item, 'remove')">
              <i class="fa fa-trash"></i>
            </b-button>
          </template>
        </b-table>
  </div>
</template>

<script>
import { showError } from "../../global";
import PageTitle from "../template/PageTitle.vue";

export default {
  components: { PageTitle },
  name: "UsersAdmin",
  data() {
    return {
      mode: "save",
      filter: "",
      user: {},
      users: [],
      search: "",
      fields: [
        { key: "email", label: "E-mail", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadUsers() {
      const url = `/users`;
      this.$http.get(url).then((res) => {
        this.users = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    save() {
      if (this.user.password !== this.user.pass) {
        this.$swal(
          "Erro!",
          "As senhas não são iguais, favor verificar!",
          "error"
        );
      } else {
        const method = this.user.id ? "put" : "post";
        const id = this.user.id ? `/${this.user.id}` : "";
        this.$http[method](`/users${id}`, this.user)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
          })
          .catch(this.errorMessage);
      }
    },
    remove() {
      const id = this.user.id;
      this.$http.delete(`/users/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset().catch(showError);
      });
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    },
    errorMessage() {
      this.$swal("Erro!", "Existem campos invalidos, favor revisar!", "error");
    },
  },
  created() {
    this.loadUsers();
  },
};
</script>

<style>
</style>

<template>
  <div class="provider-admin">
    <page-title :icon="'fa fa-address-book'" main="Fornecedores" sub="Controle de Fornecedores"  />
      <b-form> 
        <input id="user-id" type="hidden" v-model="provider.id" />
        <b-row>
          <b-col md="12" sm="12">
            <b-form-group label="Nome:" label-for="provider-name">
              <b-form-input id="provider-name" type="text" v-model="provider.name" placeholder="Informe o nome do fornecedor..." :readonly="mode === 'remove'" @input="v => {provider.name = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail:" label-for="provider-email">
              <b-form-input id="provider-email" type="email" v-model="provider.email" placeholder="Informe o e-mail do fornecedor..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Telefone:" label-for="provider-phone">
              <b-form-input v-mask="'(##)#####-####'" id="provider-phone" type="text" v-model="provider.phone" placeholder="Informe o telefone do fornecedor..." :readonly="mode === 'remove'" @input="v => {provider.phone = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="success" v-if="mode === 'save'" @click="save">Salvar</b-button>
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <br>
        <b-input-group prepend="Pesquisar..." class="mt-3">
          <b-form-input v-model="filter" type="search" placeholder="Pesquisa de fornecedores..."></b-form-input>
        </b-input-group>
      <br>
      <b-table hover striped :items="providers" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage">
        <template slot="actions" slot-scope="data">
          <b-button variant="warning" @click="loadProvider(data.item)" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="loadProvider(data.item, 'remove')">
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
      </b-table>
      <b-pagination align="center" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>

  </div>
</template>

<script>
import { showError } from "../../global";
import PageTitle from "../template/PageTitle.vue";

export default {
  components: { PageTitle },
  name: "ProvidersAdmin",
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      mode: "save",
      filter: "",
      provider: {},
      providers: [],
      fields: [
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "phone", label: "Telefone", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  computed: {
    rows() {
      return this.providers.length;
    },
  },
  methods: {
    loadProviders() {
      const url = `/providers`;
      this.$http.get(url).then((res) => {
        this.providers = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.provider = {};
      this.loadProviders();
    },
    save() {
      const method = this.provider.id ? "put" : "post";
      const id = this.provider.id ? `/${this.provider.id}` : "";
      this.$http[method](`/providers${id}`, this.provider)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.provider.id;
      this.$http.delete(`/providers/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset().catch(showError);
      });
    },
    loadProvider(provider, mode = "save") {
      this.mode = mode;
      this.provider = { ...provider };
    },
    forceUppercase(e, o, prop) {
      const start = e.target.selectionStart;
      e.target.value = e.target.value.toUpperCase();
      this.$set(o, prop, e.target.value);
      e.target.setSelectionRange(start, start);
    },
  },
  created() {
    this.loadProviders();
  },
};
</script>

<style>
</style>

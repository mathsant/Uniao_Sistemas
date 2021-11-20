<template>
  <div class="customer-admin">
    <page-title :icon="'fa fa-user'" main="Clientes" sub="Controle de clientes" />
      <b-form> 
        <input id="user-id" type="hidden" v-model="customer.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-for="customer-name">
              <b-form-input id="customer-name" type="text" v-model="customer.name" placeholder="Informe o nome do cliente..." :readonly="mode === 'remove'" @input="v => {customer.name = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail:" label-for="customer-email">
              <b-form-input id="customer-email" type="email" v-model="customer.email" placeholder="Informe o e-mail do cliente..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Endereço:" label-for="customer-address">
              <b-form-input id="customer-address" type="text" v-model="customer.address" placeholder="Informe o endereço do cliente..." :readonly="mode === 'remove'" @input="v => {customer.address = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="6">
            <b-form-group label="Telefone:" label-for="customer-phone">
              <b-form-input v-mask="'(##)#####-####'" id="customer-phone" type="text" v-model="customer.phone" placeholder="Informe o telefone do cliente..." :readonly="mode === 'remove'" @input="v => {customer.phone = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="6">
            <b-form-group label="CPF:" label-for="customer-cpf">
              <b-form-input v-mask="'###.###.###-##'" id="customer-cpf" type="text" v-model="customer.cpf" placeholder="Informe o CPF do cliente..." :readonly="mode === 'remove'" @input="v => {customer.cpf = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="success" v-if="mode === 'save'" @click="save">Salvar</b-button>
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <br>
        <b-input-group prepend="Pesquisar..." class="mt-3">
          <b-form-input v-model="filter" type="search" placeholder="Pesquisa de clientes..."></b-form-input>
        </b-input-group>
      <br>
        <b-table hover striped :items="customers" :fields="fields" :filter="filter">
          <template slot="actions" slot-scope="data">
            <b-button variant="warning" @click="loadCustomer(data.item)" class="mr-2">
              <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadCustomer(data.item, 'remove')">
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
  name: "CustomerAdmin",
  data() {
    return {
      mode: "save",
      filter: "",
      customer: {},
      customers: [],
      search: "",
      fields: [
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "phone", label: "Telefone", sortable: true },
        { key: "address", label: "Endereço", sortable: true },
        { key: "cpf", label: "CPF", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadCustomers() {
      const url = `/customers`;
      this.$http.get(url).then((res) => {
        this.customers = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.customer = {};
      this.loadCustomers();
    },
    save() {
      const method = this.customer.id ? "put" : "post";
      const id = this.customer.id ? `/${this.customer.id}` : "";
      this.$http[method](`/customers${id}`, this.customer)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.customer.id;
      this.$http.delete(`/customers/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset().catch(showError);
      });
    },
    loadCustomer(customer, mode = "save") {
      this.mode = mode;
      this.customer = { ...customer };
    },
    forceUppercase(e, o, prop) {
      const start = e.target.selectionStart;
      e.target.value = e.target.value.toUpperCase();
      this.$set(o, prop, e.target.value);
      e.target.setSelectionRange(start, start);
    },
  },
  created() {
    this.loadCustomers();
  },
};
</script>

<style>
@media print {
  body *:not(#minhaTabela):not(#minhaTabela *) {
    visibility: hidden;
  }
  #minhaTabela {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>

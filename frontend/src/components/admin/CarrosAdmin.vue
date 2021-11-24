<template>
  <div class="carros-admin">
    <page-title :icon="'fa fa-car'" main="Automóveis" sub="Controle de Automóveis"/>
      <b-form> 
        <input id="car-id" type="hidden" v-model="car.id" />
        <b-row>
          <b-col md="3" sm="6">
            <b-form-group label="Placa:" label-for="cars-name">
              <b-form-input id="cars-name" type="text" v-model="car.board" placeholder="Informe a placa do automovel..." :readonly="mode === 'remove'" @input="v => {car.board = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="6">
            <b-form-group label="Marca:" label-for="cars-brand">
              <b-form-select :options="optionsBrand" id="cars-brand" type="text" v-model="car.brand" placeholder="Informe a marca do automovel..." :readonly="mode === 'remove'" @input="v => {car.brand = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="6">
            <b-form-group label="Cor:" label-for="cars-color">
              <b-form-input id="cars-color" type="text" v-model="car.color" placeholder="Informe a cor do automovel..." :readonly="mode === 'remove'" @input="v => {car.color = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="6">
            <b-form-group label="Ano:" label-for="cars-year">
              <b-form-input id="cars-year" type="text" v-model="car.year" placeholder="Informe o ano do automovel..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Modelo:" label-for="cars-model">
              <b-form-input id="cars-model" type="text" v-model="car.model" placeholder="Informe o modelo do automovel..." :readonly="mode === 'remove'"  @input="v => {car.model = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Proprietario:" label-for="cars-customerId">
              <b-form-select id="cars-customerId" type="text" :options="customers" v-model="car.customer_id" @click="loadCustomers" :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="success" v-if="mode === 'save'" @click="save">Salvar</b-button>
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <br>
        <b-input-group prepend="Pesquisar..." class="mt-3">
          <b-form-input v-model="filter" type="search" placeholder="Pesquisa de automóvel..."></b-form-input>
        </b-input-group>
      <br>
      <b-table id="my-table" hover striped :items="cars" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage">
        <template slot="actions" slot-scope="data">
          <b-button variant="warning" @click="loadCar(data.item)" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="loadCar(data.item, 'remove')">
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
  name: "CarrosAdmin",
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      mode: "save",
      filter: "",
      car: {},
      optionsBrand: [
        "FIAT",
        "VOLKSWAGEN",
        "CHEVROLET",
        "HYUNDAY",
        "TOYOTA",
        "JEEP",
        "RENAULT",
        "HONDA",
        "NISSAN",
        "FORD",
      ],
      cars: [],
      customers: [],
      fields: [
        { key: "board", label: "Placa", sortable: true },
        { key: "brand", label: "Marca", sortable: true },
        { key: "model", label: "Modelo", sortable: true },
        { key: "year", label: "Ano", sortable: true },
        { key: "color", label: "Cor", sortable: true },
        { key: "customer.name", label: "Proprietario(a)" },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  computed: {
    rows() {
      return this.cars.length;
    },
  },
  methods: {
    loadCars() {
      const url = `/cars`;
      this.$http.get(url).then((res) => {
        this.cars = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.car = {};
      this.loadCars();
    },
    save() {
      const method = this.car.id ? "put" : "post";
      const id = this.car.id ? `/${this.car.id}` : "";
      this.$http[method](`/cars${id}`, this.car)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.car.id;
      this.$http.delete(`/cars/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset().catch(showError);
      });
    },
    loadCar(car, mode = "save") {
      this.mode = mode;
      this.car = { ...car };
    },
    loadCustomers() {
      const url = `/customers`;
      this.$http.get(url).then((res) => {
        this.customers = res.data.map((customer) => {
          return { value: customer.id, text: customer.name };
        });
      });
    },
    forceUppercase(e, o, prop) {
      const start = e.target.selectionStart;
      e.target.value = e.target.value.toUpperCase();
      this.$set(o, prop, e.target.value);
      e.target.setSelectionRange(start, start);
    },
  },
  mounted() {
    this.loadCustomers();
    this.loadCars();
  },
};
</script>

<style>
</style>

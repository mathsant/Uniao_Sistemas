<template>
  <div class="services-admin">
    <page-title :icon="'fa fa-wrench'" main="Serviços" sub="Controle de Serviços" />
      <b-form> 
        <input id="service-id" type="hidden" v-model="service.id" />
        <b-row>
          <b-col md="2" sm="4">
            <b-form-group label="Valor:" label-for="service-value">
              <b-form-input id="service-value" type="text" v-model="service.value" placeholder="Informe o valor..." :readonly="mode === 'remove'" @input="v => {service.value = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="4">
            <b-form-group label="Data:" label-for="service-date">
              <b-form-input id="service-date" type="date" v-model="service.date" placeholder="Informe a data..." :readonly="mode === 'remove'" @input="v => {service.date = v.toUpperCase()}"/>
            </b-form-group>
          </b-col>
          <b-col md="2" sm="4">
            <b-form-group label="Status:" label-for="service-status">
              <b-form-select :options="optionsStatus" id="service-status" type="text" v-model="service.status" placeholder="Informe o status..." :readonly="mode === 'remove'" @input="v => {service.status = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Colaborador Responsável:" label-for="service-collaboratorId">
              <b-form-select id="service-collaboratorId" type="text" :options="collaborators" v-model="service.collaborator_id" placeholder="Informe o proprietario(a) do automovel..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
          <b-col md="12" sm="12">
            <b-form-group label="Automovel:" label-for="service-carId">
              <b-form-select id="service-carId" type="text" :options="cars" v-model="service.car_id" placeholder="Informe o automovel..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
          <b-col md="12" sm="12">
            <b-form-group label="Descrição:" label-for="service-describe">
              <b-form-textarea id="service-describe" type="text" v-model="service.describe" placeholder="Informe o que foi feito no serviço..." :readonly="mode === 'remove'" @input="v => {service.describe = v.toUpperCase()}" required/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="success" v-if="mode === 'save'" @click="save">Salvar</b-button>
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <br>
        <b-input-group prepend="Pesquisar..." class="mt-3">
          <b-form-input v-model="filter" type="search" placeholder="Pesquisa de serviços..."></b-form-input>
        </b-input-group>
      <br>
      <b-table id="my-table" hover striped :items="services" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage">
        <template slot="value" slot-scope="value">
          R${{ value.item.value }}
        </template>
        <template slot="status" slot-scope="status">
          <b-badge v-if="status.item.status === 'ABERTO'" variant="info">{{status.item.status}}</b-badge>
          <b-badge v-if="status.item.status === 'FINALIZADO'" variant="success">{{status.item.status}}</b-badge>
          <b-badge v-if="status.item.status === 'CANCELADO'" variant="danger">{{status.item.status}}</b-badge>
        </template>
        <template slot="describe" slot-scope="describe">
          <b-badge variant="warning">{{ describe.item.describe }}</b-badge>
        </template>
        <template slot="date" slot-scope="date">
          {{ date.item.date | moment }}
        </template>
        <template slot="actions" slot-scope="data">
          <b-button variant="warning" @click="loadService(data.item)" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="loadService(data.item, 'remove')" class="mr-2">
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
      </b-table>
      <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
  </div>
</template>

<script>
import { showError } from "../../global";
import PageTitle from "../template/PageTitle.vue";
import moment from "moment";

export default {
  components: { PageTitle },
  name: "ServicesAdmin",
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      mode: "save",
      service: {},
      services: [],
      cars: [],
      optionsStatus: ["ABERTO", "FINALIZADO", "CANCELADO"],
      filter: "",
      collaborators: [],
      fields: [
        { key: "value", label: "Valor", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "car.board", label: "Automovel" },
        {
          key: "collaborator.name",
          label: "Colaborador Responsavel",
        },
        { key: "describe", label: "Descrição" },
        { key: "date", label: "Data", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  computed: {
    rows() {
      return this.services.length;
    },
  },
  methods: {
    loadServices() {
      const url = `/services`;
      this.$http.get(url).then((res) => {
        this.services = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.service = {};
      this.loadServices();
    },
    save() {
      const method = this.service.id ? "put" : "post";
      const id = this.service.id ? `/${this.service.id}` : "";
      this.$http[method](`/services${id}`, this.service)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.service.id;
      this.$http.delete(`/services/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset().catch(showError);
      });
    },
    loadService(service, mode = "save") {
      this.mode = mode;
      this.service = { ...service };
    },
    loadCars() {
      const url = `/cars`;
      this.$http.get(url).then((res) => {
        this.cars = res.data.map((car) => {
          return { value: car.id, text: car.board };
        });
      });
    },
    loadCollaborators() {
      const url = `/collaborators`;
      this.$http.get(url).then((res) => {
        this.collaborators = res.data.map((collaborator) => {
          return { value: collaborator.id, text: collaborator.name };
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
  created() {
    this.loadCollaborators();
    this.loadCars();
    this.loadServices();
  },
  filters: {
    moment: function(date) {
      moment.locale("pt-br");
      return moment(date).format("L");
    },
  },
};
</script>

<style>
</style>

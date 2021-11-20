<template>
    <div>
      <page-title icon="fa fa-envelope-square" main="Nota branca de serviços" sub="Envio de nota infomativa do serviço para o(a) cliente" />
      <b-card border-variant="dark" header="Enviar nota com informações do serviço para o(a) cliente" align="center">
          <hr>
          <h3>Informe o nome do(a) cliente...</h3>
          <b-form-select v-model="report.nameCustomer" :options="customersName" placeholder="Informe o nome"></b-form-select>
          <br>
          <br>
          <h3>Selecione o serviço que deseja enviar o relatorio...</h3>
          <b-form-select v-model="report.idServico" :options="services"></b-form-select>
          <br>
          <br>
          <h3>Informe o e-mail no qual sera enviado o relatorio...</h3>
          <b-form-select v-model="report.email" :options="customers" placeholder="Informe o e-mail"></b-form-select>
          <br>
          <br>
          <b-button block pill variant="success" @click="sendMail">Enviar</b-button>
      </b-card>
    </div>
</template>

<script>
import { showError } from "../../global";
import PageTitle from "../../components/template/PageTitle.vue";

export default {
  components: { PageTitle },
  name: "Note",
  data() {
    return {
      selected: null,
      customers: [],
      customersName: [],
      report: {},
      services: [],
    };
  },
  methods: {
    loadServices() {
      const url = `/services`;
      this.$http.get(url).then((res) => {
        this.services = res.data.map((service) => {
          return {
            value: service.id,
            text: `${service.id} - ${service.car.board} - ${service.describe} `,
          };
        });
      });
    },
    loadCustomer() {
      const url = `/customers`;
      this.$http.get(url).then((res) => {
        this.customers = res.data.map((customer) => {
          return {
            value: customer.email,
            text: `${customer.email}`,
          };
        });
      });
    },
    loadNameCustomer() {
      const url = `/customers`;
      this.$http.get(url).then((res) => {
        this.customersName = res.data.map((customer) => {
          return {
            value: customer.name,
            text: `${customer.name}`,
          };
        });
      });
    },
    reset() {
      this.report = {};
      this.loadServices();
    },
    sendMail() {
      const url = "/reports/customers";
      this.$http
        .post(url, this.report)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
  },
  created() {
    this.loadServices();
    this.loadCustomer();
    this.loadNameCustomer();
  },
};
</script>

<style>
</style>

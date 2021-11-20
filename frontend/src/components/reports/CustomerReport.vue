<template>
    <div>
      <page-title icon="fa fa-sticky-note" main="Relatorio de serviços" sub="Envio de relatorio de serviços" />
      <b-card border-variant="dark" header="Gerar relatorio de serviços" align="center">
          <br>
          <h3>Selecione a data inicial</h3>
          <b-form-input v-model="report.dateTo" type="date" placeholder="Informe o e-mail"></b-form-input>
          <br>
          <h3>Selecione a data final</h3>
          <b-form-input v-model="report.dateFrom" type="date" placeholder="Informe o e-mail"></b-form-input>
          <br>
          <h3>Informe o e-mail no qual sera enviado o relatorio...</h3>
          <b-form-input v-model="report.email" placeholder="Informe o e-mail"></b-form-input>
          <br>
          <b-button block pill variant="success" @click="sendMail">Enviar</b-button>
      </b-card>
    </div>
</template>

<script>
import PageTitle from "../../components/template/PageTitle.vue";
import { showError } from "../../global";

export default {
  components: { PageTitle },
  name: "customerReport",
  data() {
    return {
      report: {},
      users: {
        name: "teste",
        idade: 22,
      },
    };
  },
  methods: {
    sendMail() {
      const url = "/reports/manager";
      this.$http
        .post(url, this.report)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.report = {};
    },
  },
};
</script>

<style>
</style>

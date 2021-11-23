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
          <b-button block pill variant="success" @click="generateReport">Gerar Relatorio</b-button>
      </b-card>
    </div>
</template>

<script>
import PageTitle from "../../components/template/PageTitle.vue";
import { showError } from "../../global";
import { v4 as uuid } from "uuid";

export default {
  components: { PageTitle },
  name: "customerReport",
  data() {
    return {
      report: {},
    };
  },
  methods: {
    generateReport() {
      const url = "/reports/manager";
      this.$http
        .post(url, this.report, {
          responseType: "blob",
          timeout: 10000,
        })
        .then((res) => {
          let url = window.URL.createObjectURL(res.data);
          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.href = url;
          a.download = `${uuid()}.xlsx`;
          a.click();
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

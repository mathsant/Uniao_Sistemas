<template>
  <div class="admin-pages">
      <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Controle empresarial" />
      <div class="admin-pages-tabs">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Clientes" active>
              <customer-admin/>
            </b-tab>
            <b-tab title="Automoveis">
              <carros-admin />
            </b-tab>
            <b-tab title="Serviços">
              <services-admin />
            </b-tab>
            <b-tab title="Fornecedores">
              <providers-admin/>
            </b-tab>
            <b-tab title="Colaboradores">
              <collaborators-admin/>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import CarrosAdmin from "./CarrosAdmin.vue";
import CustomerAdmin from "./CustomersAdmin.vue";
import ServicesAdmin from "./ServicesAdmin.vue";
import ProvidersAdmin from "./ProvidersAdmin.vue";
import CollaboratorsAdmin from "./CollaboratorsAdmin.vue";

export default {
  name: "AdminPages",
  components: {
    PageTitle,
    CarrosAdmin,
    CustomerAdmin,
    ServicesAdmin,
    ProvidersAdmin,
    CollaboratorsAdmin,
  },
};
</script>

<style>
</style>

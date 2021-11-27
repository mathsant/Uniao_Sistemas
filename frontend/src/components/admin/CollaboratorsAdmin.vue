<template>
  <div class="collaborator-admin">
    <page-title :icon="'fa fa-users'" main="Colaboradores" sub="Controle de Colaboradores" />
      <b-form> 
        <input id="user-id" type="hidden" v-model="collaborator.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-for="collaborator-name">
              <b-form-input id="collaborator-name" type="text" v-model="collaborator.name" placeholder="Informe o nome do colaborador..." :readonly="mode === 'remove'" @input="v => {collaborator.name = v.toUpperCase()}"  required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="CPF:" label-for="collaborator-cpf">
              <b-form-input v-mask="'###.###.###-##'" id="collaborator-cpf" type="text" v-model="collaborator.cpf" placeholder="Informe o nome do colaborador..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail:" label-for="collaborator-email">
              <b-form-input id="collaborator-email" type="email" v-model="collaborator.email" placeholder="Informe o e-mail do colaborador..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Telefone:" label-for="collaborator-phone">
              <b-form-input v-mask="'(##)#####-####'" id="collaborator-phone" type="text" v-model="collaborator.phone" placeholder="Informe o telefone do colaborador..." :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group label="Data de Admissão:" label-for="collaborator-admission-date">
              <b-form-input id="collaborator-admission-date" type="date" v-model="collaborator.admissionDate" :readonly="mode === 'remove'" required/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="success" v-if="mode === 'save'" @click="save">Salvar</b-button>
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <br>
        <b-input-group prepend="Pesquisar..." class="mt-3">
          <b-form-input v-model="filter" type="search" placeholder="Pesquisa de colaboradores..."></b-form-input>
        </b-input-group>
      <br>
      <b-table hover striped :items="collaborators" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage">
        <template slot="admission_date" slot-scope="date">
          {{ date.item.admission_date | moment }}
        </template>
        <template slot="actions" slot-scope="data">
          <b-button variant="warning" @click="loadCollaborator(data.item)" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="loadCollaborator(data.item, 'remove')">
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
import moment from "moment";

export default {
  components: { PageTitle },
  name: "CollaboratorsAdmin",
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      mode: "save",
      filter: "",
      collaborator: {},
      collaborators: [],
      fields: [
        { key: "name", label: "Nome", sortable: true },
        { key: "cpf", label: "CPF", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "phone", label: "Telefone", sortable: true },
        { key: "admission_date", label: "Data de Admissão", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  computed: {
    rows() {
      return this.collaborators.length;
    },
  },
  methods: {
    loadCollaborators() {
      const url = `http://localhost:3333/collaborators`;
      this.$http.get(url).then((res) => {
        this.collaborators = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.collaborator = {};
      this.loadCollaborators();
    },
    save() {
      const method = this.collaborator.id ? "put" : "post";
      const id = this.collaborator.id ? `/${this.collaborator.id}` : "";
      this.$http[method](
        `http://localhost:3333/collaborators${id}`,
        this.collaborator
      )
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.collaborator.id;
      this.$http
        .delete(`http://localhost:3333/collaborators/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset().catch(showError);
        });
    },
    loadCollaborator(collaborator, mode = "save") {
      this.mode = mode;
      this.collaborator = { ...collaborator };
    },
  },
  created() {
    this.loadCollaborators();
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

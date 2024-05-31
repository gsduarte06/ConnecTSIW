<template>
  <div class="row">
    <div class="col-md-8">
      <card>
        <div class="create-job">
          <h1 class="title">Novo Historico Profissional</h1>
          <form @submit.prevent="submitForm" class="job-form">
            <div class="form-group">
              <label for="jobTitle">Nome da Empresa</label>
              <input
                type="text"
                id="jobTitle"
                class="form-control"
                v-model="jobTitle"
                required
              />
            </div>
            <div class="form-group">
              <label for="district">Distrito</label>
              <select id="district" class="form-control" v-model="selectedDistrict">
                <option value="" disabled selected>Selecione um distrito</option>
                <option
                  v-for="district in districts"
                  :key="district.id_district"
                  :value="district.id_district"
                  required
                >
                  {{ district.district }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="jobType">Tipo de Cargo</label>
              <select id="jobType" class="form-control" v-model="selectedOption">
                <option value="" selected>Selecione um tipo de cargo</option>
                <option
                  v-for="jobType in jobTypes"
                  :key="jobType.id_position"
                  :value="jobType.id_position"
                  required
                >
                  {{ jobType.position_desc }}
                </option>
                <option value="custom">Add new...</option>
              </select>
              <div v-if="selectedOption === 'custom'">
                <input
                  type="text"
                  class="form-control"
                  id="newOption"
                  v-model="newOption"
                  placeholder="Enter new option"
                  @keydown.enter="addOption"
                />
                <button @click="addOption" v-if="selectedOption">Add</button>
              </div>
            </div>
            <div class="form-group">
              <label for="jobDescription">Descrição do Cargo</label>
              <textarea
                id="jobDescription"
                class="form-control"
                v-model="jobDescription"
                required
              ></textarea>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="startDate">Data de Início</label>
                  <input
                    type="date"
                    id="startDate"
                    class="form-control"
                    v-model="startDate"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="endDate">Data de Término</label>
                  <input
                    type="date"
                    id="endDate"
                    class="form-control"
                    v-model="endDate"
                  />
                </div>
              </div>
            </div>
            <div class="text-right">
              <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
          </form>
        </div>
      </card>
    </div>
    <div class="col-md-4">
      <div class="history-cards">
        <card v-for="(job, index) in jobHistory" :key="index">
          <h3>{{ job.name_company }}</h3>
          <p>
            <strong>Distrito:</strong>
            {{ districts.find((d) => d.id_district == job.id_district).district }}
          </p>
          <p>
            <strong>Tipo de Cargo:</strong>
            {{ jobTypes.find((d) => d.id_position == job.id_position).position_desc }}
          </p>
          <p><strong>Descrição do Cargo:</strong> {{ job.descricao_position }}</p>
          <p><strong>Data de Início:</strong> {{ job.begin_date }}</p>
          <p v-if="job.end_date"><strong>Data de Término:</strong> {{ job.end_date }}</p>
          <button @click="removeJob(job.id_background)" class="delete-btn">
            <i class="fas fa-trash-alt"></i>
          </button>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { usePositionStore } from "../store/positions";
import * as api from "../api/api";
import { useUserStore } from "../store/user";
export default {
  data() {
    return {
      jobTitle: "",
      selectedDistrict: "",
      jobDescription: "",
      selectedOption: "",
      startDate: "",
      endDate: "",
      districts: null,
      positionStore: usePositionStore(),
      userStore: useUserStore(),
      newOption: "",
      token: null,
    };
  },

  async mounted() {
    this.token = this.userStore.getToken;
    await this.positionStore.fetchPositions(this.token);
    this.districts = await api.get(`districts`, this.token);
  },
  computed: {
    jobHistory() {
      return this.userStore.getBg;
    },
    jobTypes() {
      return this.positionStore.getPositions;
    },
  },
  methods: {
    async submitForm() {
      console.log(this.selectedOption);
      const formData = {
        company: this.jobTitle,
        idDistrict: this.selectedDistrict,
        description: this.jobDescription,
        idPosition: this.selectedOption,
        beginDate: this.startDate,
        endDate: this.endDate || null,
        idUser: this.userStore.getUser.id_user,
      };
      console.log(formData);
      await this.userStore.addBackground(formData, this.token);

      // Limpar campos do formulário após enviar
      this.jobTitle = "";
      this.selectedDistrict = "";
      this.jobDescription = "";
      this.selectedOption = "";
      this.startDate = "";
      this.endDate = "";
      await this.userStore.fetchBackground(this.token);
    },

    async removeJob(index) {
      console.log(index);
      await api.del(`backgrounds/${index}`, this.token);
      await this.userStore.fetchBackground(this.token);
    },
    async addOption() {
      let data = {};
      data.position = this.newOption;
      await this.positionStore.addPosition(data, this.token);
      await this.positionStore.fetchPositions(this.token);
      this.selectedOption = this.newOption;
    },
  },
};
</script>

<style scoped>
.create-job {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.job-form .form-group {
  margin-bottom: 20px;
}

.job-form label {
  font-weight: bold;
}

.job-form .form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #f8f9fa;
}

.job-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.job-form button:hover {
  background-color: #0056b3;
}

.job-form select {
  background-color: #343a40;
  color: #f8f9fa;
  border: 1px solid #343a40;
  border-radius: 5px;
  padding: 10px;
}

.job-form select option:hover {
  background-color: #495057;
}
</style>

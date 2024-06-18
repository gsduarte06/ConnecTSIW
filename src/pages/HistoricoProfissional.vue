<template>
  <div class="row">
    <div class="col-md-8">
      <card>
        <div class="create-job">
          <h1 class="title">New background</h1>
          <form @submit.prevent="submitForm" class="job-form">
            <div class="form-group">
              <label for="jobTitle">Entity Name</label>
              <input
                type="text"
                id="jobTitle"
                class="form-control"
                v-model="jobTitle"
                required
              />
            </div>
            <div class="form-group">
              <label for="district">District</label>
              <select id="district" class="form-control" v-model="selectedDistrict">
                <option value="" disabled selected>Select district</option>
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
              <label for="jobType">Position</label>
              <select id="jobType" class="form-control" v-model="selectedOption">
                <option value="" selected>Select Position</option>
                <option
                  v-for="jobType in jobTypes"
                  :key="jobType.id_position"
                  :value="jobType.id_position"
                  required
                >
                  {{ jobType.position_desc }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="jobDescription">Job Description</label>
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
                  <label for="startDate">Begin Date</label>
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
                  <label for="endDate">End Date</label>
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
              <button type="submit" class="btn btn-primary" v-if="!edit">Save</button>
            </div>
          </form>
          <button type="" class="btn btn-primary" v-if="edit" @click="redo">
            Cancel
          </button>
          <button type="" class="btn btn-primary" v-if="edit" @click="update">
            Save
          </button>
        </div>
      </card>
    </div>
    <div class="col-md-4">
      <div class="history-cards">
        <card v-for="(job, index) in jobHistory" :key="index">
          <div @click="editBG(job)">
            <h3>{{ job.name_company }}</h3>
            <p>
              <strong>District:</strong>
              {{ districts.find((d) => d.id_district == job.id_district).district }}
            </p>
            <p>
              <strong>Position:</strong>
              {{ jobTypes.find((d) => d.id_position == job.id_position).position_desc }}
            </p>
            <p><strong>Description:</strong> {{ job.descricao_position }}</p>
            <p><strong>Begin Date:</strong> {{ job.begin_date }}</p>
            <p v-if="job.end_date"><strong>End Date:</strong> {{ job.end_date }}</p>
            <button @click="removeJob(job.id_background)" class="delete-btn">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
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
      edit: false,
      jobId: "",
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
    editBG(job) {
      this.edit = true;
      console.log(job);
      this.startDate = job.begin_date;
      if (job.end_date != null) this.endDate = job.end_date;
      this.selectedDistrict = job.id_district;
      this.selectedOption = job.id_position;
      this.jobDescription = job.descricao_position;
      this.jobTitle = job.name_company;
      this.jobId = job.id_background;
    },
    redo() {
      this.jobTitle = "";
      this.selectedDistrict = "";
      this.jobDescription = "";
      this.selectedOption = "";
      this.startDate = "";
      this.endDate = "";
      this.edit = false;
    },
    async update() {
      const formData = {
        name_company: this.jobTitle,
        id_district: this.selectedDistrict,
        descricao_position: this.jobDescription,
        id_position: this.selectedOption,
        begin_date: this.startDate,
        end_date: this.endDate || null,
      };
      console.log(formData);

      const res = await this.userStore.updateBackground(this.jobId, formData, this.token);
      console.log(res);

      await this.userStore.fetchBackground(this.token);

      if (!res.msg.includes("No updates were made on background with ID")) {
        let oldxp = await api.get(
          `users/${this.userStore.userId}/xp`,
          this.userStore.token
        );

        const data = {};
        let addXp = 100;
        addXp += parseInt(oldxp[0].xp);
        data.xp = addXp;
        await this.userStore.updateUser(data);
      }
      this.redo();
    },
    async submitForm() {
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

      let oldxp = await api.get(
        `users/${this.userStore.userId}/xp`,
        this.userStore.token
      );

      const data = {};
      let addXp = 500;
      addXp += parseInt(oldxp[0].xp);
      data.xp = addXp;
      await this.userStore.updateUser(data);
    },

    async removeJob(index) {
      console.log(index);
      await api.del(`backgrounds/${index}`, this.token);
      await this.userStore.fetchBackground(this.token);
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

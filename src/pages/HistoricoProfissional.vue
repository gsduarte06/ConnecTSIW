<template>
    <div class="row">
      <div class="col-md-8">
        <card>
          <div class="create-job">
            <h1 class="title">Novo Historico Profissional</h1>
            <form @submit.prevent="submitForm" class="job-form">
              <div class="form-group">
                <label for="jobTitle">Nome da Empresa</label>
                <input type="text" id="jobTitle" class="form-control" v-model="jobTitle">
              </div>
              <div class="form-group">
                <label for="district">Distrito</label>
                <select id="district" class="form-control" v-model="selectedDistrict">
                  <option value="" disabled selected>Selecione um distrito</option>
                  <option v-for="district in districts" :key="district.id" :value="district.name">{{ district.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="jobType">Tipo de Cargo</label>
                <select id="jobType" class="form-control" v-model="selectedJobType">
                  <option value="" disabled selected>Selecione um tipo de cargo</option>
                  <option v-for="jobType in jobTypes" :key="jobType.id" :value="jobType.name">{{ jobType.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="jobDescription">Descrição do Cargo</label>
                <textarea id="jobDescription" class="form-control" v-model="jobDescription"></textarea>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="startDate">Data de Início</label>
                    <input type="date" id="startDate" class="form-control" v-model="startDate">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="endDate">Data de Término</label>
                    <input type="date" id="endDate" class="form-control" v-model="endDate">
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
            <h3>{{ job.jobTitle }}</h3>
            <p><strong>Distrito:</strong> {{ job.selectedDistrict }}</p>
            <p><strong>Tipo de Cargo:</strong> {{ job.selectedJobType }}</p>
            <p><strong>Descrição do Cargo:</strong> {{ job.jobDescription }}</p>
            <p><strong>Data de Início:</strong> {{ job.startDate }}</p>
            <p><strong>Data de Término:</strong> {{ job.endDate }}</p>
            <button @click="removeJob(index)" class="delete-btn"><i class="fas fa-trash-alt"></i></button>
          </card>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        jobTitle: '',
        selectedDistrict: '',
        jobDescription: '',
        selectedJobType: '',
        startDate: '',
        endDate: '',
        districts: [
          { id: 1, name: 'Aveiro' },
          { id: 2, name: 'Beja' },
          { id: 3, name: 'Braga' },
        ],
        jobTypes: [
          { id: 1, name: 'Full Stack Developer' },
          { id: 2, name: 'Lead Designer' },
          { id: 3, name: 'Freelancer' },
        ]
      };
    },
    computed: {
      jobHistory() {
        return JSON.parse(localStorage.getItem('jobHistory')) || [];
      }
    },
    methods: {
      submitForm() {
        const formData = {
          jobTitle: this.jobTitle,
          selectedDistrict: this.selectedDistrict,
          jobDescription: this.jobDescription,
          selectedJobType: this.selectedJobType,
          startDate: this.startDate,
          endDate: this.endDate
        };
        const jobHistory = JSON.parse(localStorage.getItem('jobHistory')) || [];
        jobHistory.push(formData);
        localStorage.setItem('jobHistory', JSON.stringify(jobHistory));
        // Limpar campos do formulário após enviar
        this.jobTitle = '';
        this.selectedDistrict = '';
        this.jobDescription = '';
        this.selectedJobType = '';
        this.startDate = '';
        this.endDate = '';
      },
      removeJob(index) {
        const jobHistory = JSON.parse(localStorage.getItem('jobHistory')) || [];
        jobHistory.splice(index, 1);
        localStorage.setItem('jobHistory', JSON.stringify(jobHistory));
      }
    }
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
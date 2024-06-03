<template>
  <div>
    <base-table :data="tableData" thead-classes="text-primary">
      <template slot-scope="{ row }">
        <td>
          <div class="mb-8">
            <p class="title mb-0">{{ row.title }}</p>
            <p class="text-muted">{{ row.date }}</p>
          </div>
          <div class="text-center mb-3">
            <img :src="row.image" alt="Image" style="max-width: 450px; max-height: 300px; display: block; margin: 0 auto;">
          </div>
          <div class="text-center"> 
            <router-link :to="'/post/' + row.id" class="btn btn-secondary mr-1"><i class="fas fa-comments"></i> Comments</router-link>
            <!-- Button to show number of participants -->
            <button type="button" class="btn btn-secondary btn-participants" @click="openParticipantsModal(row)">
              <i class="fas fa-users"></i>
              <span class="badge badge-light">{{ row.participants }}</span>
            </button>
          </div>
        </td>
      </template>
    </base-table>

    <!-- Modal -->
    <div class="modal" :class="{ 'is-active': showParticipantsModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p>Post Title: {{ selectedPost.title }}</p>
          <p>Number of Participants: {{ selectedPost.participants }}</p>
          <table class="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="participant in selectedPost.participantList" :key="participant.id">
                <td>{{ participant.id }}</td>
                <td>{{ participant.name }}</td>
                <td>
                  <router-link :to="'/cv/' + participant.cvId" class="btn btn-danger btn-sm"><i class="fas fa-file-alt"></i> View CV</router-link>
                </td>
              </tr>
              <!-- Dummy data for demonstration -->
              <tr v-for="n in 5" :key="n">
                <td>Dummy ID {{ n }}</td>
                <td>Dummy Name {{ n }}</td>
                <td>
                  <button class="btn btn-danger btn-sm"><i class="fas fa-file-alt"></i> View CV</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <button type="button" class="btn btn-secondary mr-1" @click="closeParticipantsModal">Close</button>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeParticipantsModal"></button>
    </div>
  </div>
</template>

<script>
import { BaseTable } from "@/components";
import postData from "../Dashboard/postData.js";

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      taskList: [],
      showParticipantsModal: false,
      selectedPost: {},
    };
  },
  created() {
    this.taskList = postData;
  },
  computed: {
    tableData() {
      return this.taskList.map(item => ({
        id: item.Id_Publicacao,
        title: item.Conteudo_Publicacao,
        image: item.Imagem,
        date: item.Data_Criado,
        participants: item.Participants,
        participantList: item.ParticipantList, // assuming each post has a list of participants
      }));
    },
  },
  methods: {
    openParticipantsModal(post) {
      this.selectedPost = post;
      this.showParticipantsModal = true;
    },
    closeParticipantsModal() {
      this.showParticipantsModal = false;
    },
  },
};
</script>

<style scoped>
.modal {
  display: none;
}

.modal.is-active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #201c24;
  padding: 20px;
  width: 60%;
  overflow: auto; /* Enable scrolling if table content exceeds modal size */
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  position: absolute;
  top: 10px;
  right: 10px;
}
.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}
</style>
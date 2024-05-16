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
            <button type="button" class="btn btn-secondary mr-1"><i class="fas fa-thumbs-up"></i> Gosto</button>
            <router-link :to="'/post/' + row.id" class="btn btn-secondary mr-1"><i class="fas fa-comments"></i> Comentários</router-link>
            <button type="button" class="btn btn-secondary mr-1" @click="openModal(row)"><i class="fas fa-user"></i> Participar</button>
          </div>
        </td>
      </template>
    </base-table>

    <!-- Modal -->
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p>Data de Início: {{ selectedPost.date_inicio }}</p>
          <div class="text-right">
            <button type="button" class="btn btn-secondary mr-1" @click="closeModal">Fechar</button>
            <button type="button" class="btn btn-primary" @click="participate">Participar</button>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
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
      showModal: false,
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
        date_inicio: item.Data_Inicio,
      }));
    },
  },
  methods: {
    openModal(post) {
      this.selectedPost = post;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    participate() {
      console.log("Participar");
    }
  }
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
  width: 40%;
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

.modal-content .btn {
  margin-right: 10px;
}
</style>
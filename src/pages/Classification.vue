<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <card style="height: auto">
          <h1>{{ pageTitle }}</h1>
          <p>{{ classificationText }}</p>
          <p>{{ importanceText }}</p>
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(participant, index) in participants" :key="participant.id">
                <td>{{ index + 1 }}</td>
                <td>{{ participant.username }}</td>
                <td>{{ participant.xp }}</td>
              </tr>
            </tbody>
          </table>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "../api/api";
export default {
  data() {
    return {
      pageTitle: "Classifications",
      classificationText:
        "While using ConnecTSIW you gain EXP, by liking, participation and sharing more about yourself",
      importanceText:
        "The Prize of being first gains you the benifict of being the speaker in a workshop",
      participants: [],
    };
  },
  async created() {
    const params = new URLSearchParams({
      xp: true,
    });
    this.participants = await api.get(`users?${params.toString()}`);
  },
  methods: {
    async getClassification() {
      this.participants = await api.get("users", { xp: true });
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>

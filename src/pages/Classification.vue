<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <card style="height: auto;">
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
                <td>{{ participant.name }}</td>
                <td>{{ participant.score }}</td>
              </tr>
            </tbody>
          </table>
        </card>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pageTitle: "Classifications",
        classificationText: "While using ConnecTSIW you gain EXP, by liking, participation and sharing more about yourself",
        importanceText: "The Prize of being first gains you the benifict of being the speaker in a workshop",
        participants: [
          { id: 1, name: "Participant 1", score: 258 },
          { id: 2, name: "Participant 2", score: 169 },
          { id: 3, name: "Participant 3", score: 140 },
          { id: 4, name: "Participant 4", score: 132 },
          { id: 5, name: "Participant 5", score: 100 },
          { id: 6, name: "Participant 6", score: 98 },
          { id: 7, name: "Participant 7", score: 95 },
          { id: 8, name: "Participant 8", score: 58 },
          { id: 9, name: "Participant 9", score: 50 },
          { id: 10, name: "Participant 10", score: 38 },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
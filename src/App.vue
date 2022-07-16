<template>
  <v-app>
    <v-app-bar class="d-flex justify-center" style="box-shadow: none !important" app color="white">
      <v-tabs>
        <v-tab class="d-flex flex-column mx-3 " @click="changeIndex(1)">
          <v-icon>mdi-forum</v-icon>
          <div>Chat</div>
        </v-tab>

        <v-tab class="d-flex flex-column mx-3  " @click="changeIndex(2)">
          <v-icon>mdi-cube</v-icon>
          <div>Dữ liệu</div>
        </v-tab>

        <v-tab class="d-flex flex-column mx-3  " @click="changeIndex(3)">
          <v-icon>mdi-wrench</v-icon>
          <div>Training</div>
        </v-tab>
        <!-- <v-tab class="d-flex flex-column mx-3 " @click="changeIndex(3)">
          <v-icon>mdi-variable-box</v-icon>
          <div>Mô hình</div>
        </v-tab> -->
      </v-tabs>
    </v-app-bar>

    <v-main style="background-color: #f5f5f5;">
      <ChatBot v-if="this.indexTab == 1"></ChatBot>
      <DataPage v-if="this.indexTab == 2" />
      <TrainingPage v-if="this.indexTab == 3"></TrainingPage>
    </v-main>
  </v-app>
</template>

<script>
import DataPage from './components/DataPage';
import ChatBot from './components/ChatBot';
import TrainingPage from './components/TrainingPage.vue'
export default {
  name: 'App',

  components: {
    TrainingPage,
    ChatBot,
    DataPage,
  },

  data: () => ({
    indexTab: 1
  }),
  methods: {
    changeIndex(index) {
      this.indexTab = index;
    },
  },
};
</script>
<style scoped>
</style>

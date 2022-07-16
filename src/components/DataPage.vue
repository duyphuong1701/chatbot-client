<template>
  <div class="d-flex data">
    <div class="data-nav data-item">
      <v-tabs vertical>
        <v-tab @click="changeIndex(1)">Câu hỏi</v-tab>
        <v-tab @click="changeIndex(2)">Trả lời</v-tab>
        <v-tab @click="changeIndex(3)">Thể loại</v-tab>
        <v-tab @click="changeIndex(4)">Nhóm</v-tab>
        <v-tab @click="changeIndex(5)">Mô hình</v-tab>
      </v-tabs>
    </div>
    <div class="data-content data-item">
      <question-table v-if="this.indexTab == 1"></question-table>
      <answer-table v-if="this.indexTab == 2"></answer-table>
      <category-table v-if="this.indexTab==3"></category-table>
      <group-table v-if="this.indexTab==4"></group-table>
      <model-table v-if="this.indexTab==5"></model-table>
    </div>
  </div>
</template>
<script>
import QuestionTable from '@/components/question/QuestionTable.vue';
import AnswerTable from './answer/AnswerTable.vue';
import CategoryTable from './category/CategoryTable.vue';
import GroupTable from './group/GroupTable.vue';
import ModelTable from './model/ModelTable.vue';
export default {
  name: 'DataPage',
  components: {
    QuestionTable,
    CategoryTable,
    AnswerTable,
    GroupTable,
    ModelTable
},
  data: () => ({
    indexTab: 1
  }),
  methods: {
    changeIndex(index) {
      this.indexTab = index;
    },
  },
}
</script>
<style lang="scss">
 .v-tabs--vertical>.v-tabs-bar .v-tabs-bar__content {
    flex-direction: row;
  }

  .data {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
  }

  .data-nav {
    text-align: center;
    background-color: white;
    height: 5%;
    width: 100%;
  }

  .data-content {
    background-color: white;

    height: 90%;
    width: 100%;
  }

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .v-tabs--vertical>.v-tabs-bar .v-tabs-bar__content {
    flex-direction: row;
  }

  .data {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
  }

  .data-nav {
    text-align: center;
    background-color: white;
    height: 5%;
    width: 100%;
  }

  .data-content {
    background-color: white;

    height: 90%;
    width: 100%;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .v-tabs--vertical>.v-tabs-bar .v-tabs-bar__content {
    flex-direction: row;
  }

  .data {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
  }

  .data-nav {
    text-align: center;
    background-color: white;
    height: 5%;
    width: 100%;
  }

  .data-content {
    background-color: white;

    height: 90%;
    width: 100%;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .v-tabs--vertical>.v-tabs-bar .v-tabs-bar__content {
    flex-direction: row;
  }

  .data {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
  }

  .data-nav {
    text-align: center;
    background-color: white;
    height: 5%;
    width: 100%;
  }

  .data-content {
    background-color: white;

    height: 90%;
    width: 100%;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .v-tabs--vertical>.v-tabs-bar .v-tabs-bar__content {
    flex-direction: column;
  }

  .data {
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5;
    width: 100%;
    height: 100%;
  }

  .data-nav {
    background-color: white;
    height: 97.5%;
    width: 10%;
  }

  .data-content {
    background-color: white;
    height: 95%;
    width: 85%;
  }

  .data-item {
    border-radius: 5px;
    margin: 10px
  }

}
</style>
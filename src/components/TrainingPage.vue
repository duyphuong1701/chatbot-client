<template>
  <v-container>
    <v-card :loading="loading" class="mx-auto my-12" max-width="85%">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        src="https://miro.medium.com/max/840/1*vgvrUBToBQ7tvUmiRav_6Q.jpeg"
      ></v-img>

      <v-card-text>
        <div>Huấn luyện lại mô hình, khi có cập nhật dữ liệu</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <v-row justify="left" class="ma-1">
        <v-col sm="4"
          ><v-select
            v-model="modelName"
            label="Mô hình"
            :items="items"
            outlined
          ></v-select
        ></v-col>
        <v-col v-if="this.modelName == 'SVM'" sm="2">
          <v-text-field v-model="c_score" label="Tham số C"></v-text-field
        ></v-col>
        <v-col v-if="this.modelName == 'K-Nearest Neighbors'" sm="2">
          <v-text-field v-model="c_score" label="N_neighbors"></v-text-field
        ></v-col>
        <v-col v-if="this.modelName == 'Random Forest'" sm="2">
          <v-text-field
            v-model="n_estimators"
            label="n_estimators"
          ></v-text-field>
        </v-col>
        <v-col v-if="this.modelName == 'Random Forest'" sm="2">
          <v-text-field v-model="criterion" label="criterion"></v-text-field>
        </v-col>
        <v-col v-if="this.modelName == 'Random Forest'" sm="2">
          <v-text-field v-model="c_score" label="max_depth"></v-text-field>
        </v-col>
        <v-col sm="2">
          <v-checkbox v-model="checkbox" :label="`Phân cấp`"></v-checkbox>
        </v-col>
      </v-row>

      <v-card-actions> </v-card-actions>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blue lighten-2"
            text
            v-bind="attrs"
            v-on="on"
            @click="getAnswer"
          >
            Huấn luyện
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Thông báo
          </v-card-title>

          <v-card-text>
            Quá trình train dữ liệu mới được chạy ngầm, kết quả hoàn thành sẽ
            xuất hiện ở Dữ liệu/Mô hình
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Đồng ý </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "TrainingPage",
  data: () => ({
    BASE_ML_URL: `${process.env.VUE_APP_MANAGEMENT_SERVER}/train-multi-sol2?c=10&times=0`,
    items: ["SVM", "K-Nearest Neighbors", "Random Forest"],
    c_score: 50,
    modelSelect: 1,
    n_estimators: "100",
    max_depth: "None",
    criterion: "gini",
    modelName: "",
    dialog: false,
  }),
  methods: {
    async getAnswer() {
      let data;
      try {
        await this.$axios.post(this.BASE_URL).then((res) => {
          data = res.data;
        });
      } catch (e) {
        console.log(e);
      }
      return data;
    },
  },
};
</script>
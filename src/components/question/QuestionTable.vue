<template>
  <div>
    <v-row justify="center">
      <v-col md="10">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Tìm kiếm"
          single-line
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Tạo mới
          </v-btn>
        </template>
        <v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Dừng </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Lưu </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="desserts"
      item-key="questionId"
      :header-props="{ sortIcon: null }"
      :items-per-page="15"
      style="height: 100; width: 100"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="50vw">
        <v-card>
          <v-card-title class="text-h5"> Chỉnh sửa </v-card-title>
          <div class="mx-5">
            <v-text-field
              label="ID lớp"
              v-model="editedItem.questionId"
            ></v-text-field>
            <v-text-field
              label="ID nhóm"
              v-model="editedItem.categoryId"
            ></v-text-field>
            <v-text-field
              label="Câu hỏi"
              v-model="editedItem.questionContent"
            ></v-text-field>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color=" darken-1" text @click="close"> Hủy </v-btn>
            <v-btn color=" darken-1" text @click="save"> Cập nhật </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      search: "",
      dialog: false,
      url_axios: `${process.env.VUE_APP_MANAGEMENT_SERVER}/questions`,
      headers: [
        { text: "ID câu hỏi", value: "question_id", width: "26%" },
        { text: "ID chủ đề", value: "category_id", width: "6%" },
        { text: "ID Nhóm", value: "group_id", width: "6%" },
        { text: "Câu hỏi", value: "question_content", width: "50%" },
        { text: "Thao tác", value: "actions", sort: false, width: "10%" },
      ],
      categorys: [],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        questionId: 0,
        categoryId: "",
        categoryName: "",
        questionContent: "",
      },
      defaultItem: {
        questionId: 0,
        categoryId: "",
        categoryName: "",
        questionContent: "",
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    env() {
      return process.env;
    },
  },
  mounted() {},

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.syncData();
  },

  methods: {
    async syncData() {
      const question = await this.getQuestion();
      this.desserts = question;
    },
    async getQuestion() {
      let data;
      try {
        await this.$axios.get(this.url_axios).then((res) => {
          data = res.data;
        });
      } catch (e) {
        console.log(e);
      }
      return data;
    },
    deleteQuestion(item) {
      try {
        this.$axios.delete(`${this.url_axios}/${item.questionId}`);
      } catch (e) {
        console.log(e);
      }
    },
    putQuestion(item) {
      try {
        console.log(item);
        this.$axios.put(
          `${this.url_axios}/${item.questionId}`,
          {
            questionId: item.questionId,
            categoryId: item.categoryId,
            questionContent: item.questionContent,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
    postQuestion(item) {
      try {
        this.$axios.post(
          `${this.url_axios}`,
          {
            questionId: item.questionId,
            categoryId: item.categoryId,
            questionContent: item.questionContent,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.desserts.splice(this.editedIndex, 1);
      this.deleteQuestion(item);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.putQuestion(this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
        this.postQuestion(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style>
.v-data-footer {
  position: fixed;
  bottom: 10px;
  width: 85%;
  background: white;
}
</style>
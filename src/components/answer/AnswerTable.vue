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
      fixed-header
      :search="search"
      :headers="headers"
      :items="desserts"
      item-key="answerId"
      :header-props="{ sortIcon: null }"
      :items-per-page="14"
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
              disabled
              v-model="editedItem.answerId"
            ></v-text-field>
            <v-text-field
              label="ID nhóm"
              v-model="editedItem.categoryId"
            ></v-text-field>
            <v-text-field
              label="Câu hỏi"
              v-model="editedItem.answerContent"
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
  name: "AnswerTable",
  data: () => ({
    search: "",
    dialog: false,
    BASE_URL: `${process.env.VUE_APP_MANAGEMENT_SERVER}/answers`,
    headers: [
      { text: "ID trả lời", value: "answer_id", width: "25%" },
      { text: "ID chủ đề", value: "category_id", width: "5%" },
      { text: "Câu trả lời", value: "answer_content", width: "60%" },
      { text: "Thao tác", value: "actions", width: "10%" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      answer_id: 0,
      category_id: "",
      answer_content: "",
    },
    defaultItem: {
      answer_id: 0,
      category_id: "",
      answer_content: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

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
      const answer = await this.getAnswer();
      this.desserts = answer;
    },

    async getAnswer() {
      let data;
      try {
        await this.$axios.get(this.BASE_URL).then((res) => {
          data = res.data;
        });
      } catch (e) {
        console.log(e);
      }
      return data;
    },
    deleteQuestion(item) {
      try {
        this.$axios.delete(`${this.BASE_URL}/${item.answerId}`);
      } catch (e) {
        console.log(e);
      }
    },
    putQuestion(item) {
      try {
        console.log(item);
        this.$axios.put(
          `${this.BASE_URL}/${item.answerId}`,
          {
            answerId: item.answerId,
            categoryId: item.categoryId,
            answerContent: item.answerContent,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (e) {
        console.log(e);
      }
    },
    postQuestion(item) {
      try {
        this.$axios.post(
          `${this.BASE_URL}`,
          {
            answerId: item.answerId,
            categoryId: item.categoryId,
            answerContent: item.answerContent,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (e) {
        console.log(e);
      }
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      console.log(item);
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
<style lang="scss" scoped>
.v-data-table table tfoot th {
  position: sticky;
  bottom: 0;
  background: #fff;
}
</style>
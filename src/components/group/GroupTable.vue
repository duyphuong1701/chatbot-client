<template>
  <div>
    <v-row justify="center">
      <v-col md="10">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Tìm kiếm" single-line hide-details>
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
    <v-data-table :search="search" :headers="headers" :items="desserts">
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
            <v-text-field label="ID chủ đề" v-model="editedItem.categoryId"></v-text-field>
            <v-text-field label="ID chủ đề" v-model="editedItem.categoryName"></v-text-field>
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
  name: "CategoryTable",
  data: () => ({
    search: "",
    dialog: false,
    BASE_URL: "http://localhost:8088/groups",
    headers: [
      { text: "Mã nhóm", align: "start", value: "group_id", width: "10%", },
      { text: "Tên nhóm", value: "group_name", width: "80%" },
      { text: "Thao tác", value: "actions", sortable: false, width: "10%" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      categoryId: "",
      categoryName: "",
    },
    defaultItem: {
      categoryId: "",
      categoryName: "",
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
    this.initialize();
    this.getCategory();
  },

  methods: {
    initialize() {
      this.desserts = [];
    },
    getCategory() {
      try {
        this.$axios
          .get(`${this.BASE_URL}`)
          .then((res) => {
            this.desserts = res.data;
          });
      } catch (e) {
        console.log(e);
      }
    },
    deleteCategory(item) {
      try {
        this.$axios.delete(
          `http://localhost:8089/wave-sample/api/category/${item.categoryId}`
        );
      } catch (e) {
        console.log(e);
      }
    },
    putCategory(item) {
      try {
        console.log(`update item ${item.categoryId}`);
        console.log(item);
        this.$axios.put(
          `http://localhost:8089/wave-sample/api/category/${item.categoryId}`,
          {
            categoryId: item.categoryId,
            categoryName: item.categoryName,
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
    postCategory(item) {
      try {
        console.log(`post item ${item.categoryId}`);
        console.log(item);
        this.$axios.post(
          `http://localhost:8089/wave-sample/api/category/`,
          {
            categoryId: item.categoryId,
            categoryName: item.categoryName,
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
      this.deleteCategory(item);
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
        this.putCategory(this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
        this.postCategory(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
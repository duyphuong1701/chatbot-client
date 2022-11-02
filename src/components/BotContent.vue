<template>
  <div class="d-flex flex-row">
    <v-avatar>
      <v-img src="@/assets/bot.jpg"></v-img>
    </v-avatar>
    <v-card class="align-left ml-5" outlined>
      <v-container class="d-flex flex-column">
        <div class="d-flex justify-space-between">
          <b class="d-flex mx-2">Bot</b>
          <small class="d-flex mx-2 text-right">{{ time }}</small>
        </div>

        <v-divider class="mx-1"></v-divider>
        <div class="d-flex ma-2">{{ content }}</div>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "ChatContent",
  props: ["content", "time"],
};
</script>
<style lang="scss">
</style>
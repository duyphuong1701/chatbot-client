<template>
    <div class="d-flex flex-row">
        <v-card class="align-right mr-5" outlined>
            <v-container class="d-flex flex-column">
                <div class="d-flex justify-space-between">
                    <small class="d-flex mx-2 text-left ">{{ time }}</small>
                    <b class="d-flex mx-2">Sinh viên</b>
                </div>
                <v-divider class="mx-1"></v-divider>
                <div class="d-flex ma-2"> {{ content }}</div>
            </v-container>
        </v-card>

        <v-avatar>
            <v-img src="@/assets/user.png"></v-img>
        </v-avatar>
    </div>
</template>
<script>
export default {
    name: "UserContent",
    props: ['content', 'time']
}
</script>
<style lang="scss">
</style>
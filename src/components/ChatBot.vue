<template>
  <section class="chat-box">
    <div class="chat-box-list-container" ref="chatbox">
      <ul class="chat-box-list">
        <li class="message" v-for="(message, idx) in messages" :key="idx" :class="message.author">
          <div>
            <bot-content v-if="message.author == 'server'" :content="message.text" :time="message.time"></bot-content>
            <user-content v-if="message.author == 'client'" :content="message.text" :time="message.time"
              style="float:right">
            </user-content>
          </div>
        </li>
      </ul>
    </div>
    <div class="chat-inputs">
      <input type="text" spellcheck="false" v-model="message" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Gửi câu hỏi</button>
    </div>
  </section>
</template>

<script>
import BotContent from '@/components/BotContent';
import UserContent from './UserContent.vue';
export default {
  name: "ChatBox",
  components: { BotContent, UserContent },
  data: () => ({
    BASE_URL: process.env.VUE_APP_ML_SERVER,
    message: "",
    messages: [],
  }),
  created() {
    this.syncData();
  },
  methods: {
    syncData() {
      var current = new Date();
      if (this.messages.length == 0) {
        this.messages.push({
          text: "Xin chào",
          time: current.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
          author: "server",
        });
        this.messages.push({
          text: "Bạn cần hỗ trợ gì",
          time: current.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
          author: "server",
        });
      }
    },
    sendMessage() {
      var current = new Date();
      const message = this.message;
      this.messages.push({
        text: message,
        time: current.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
        author: "client",
      });
      this.message = "";
      this.$axios
        .get(this.BASE_URL+"/query2?question="+message)
        .then((res) => {
          console.log(res);

          this.messages.push({
            text: res.data.answer_content,
            time: current.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
            author: "server",
          });
          this.$nextTick(() => {
            this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight;
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.chat-box,
.chat-box-list {
  height: 80vh;
  display: flex;
  flex-direction: column;
  list-style-type: none;
}

.chat-box-list-container {
  height: 85%;
  -ms-overflow-style: none;
  /* for Internet Explorer, Edge */
  scrollbar-width: none;
  /* for Firefox */
  overflow-y: scroll;
  margin-bottom: 1px;
}

.chat-box-list-container::-webkit-scrollbar {
  display: none;
  /* for Chrome, Safari, and Opera */
}

.chat-box-list {
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;

  li {
    margin-top: 10px;
  }

  p {

    border-radius: 20px;
    padding: 10px;
  }

  .server {
    p {
      margin-left: 10vh;
      background: #1877F2;
      float: right;
      color: white;
      text-align: left;
    }
  }

  .client {
    p {
      margin-right: 10vh;
      background: #ccc;
      float: left;
    }
  }
}

.chat-box {
  // margin: 10px;
  border: none;
  width: 60vw;
  height: 100%;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  align-items: space-between;
  justify-content: space-between;
}

.chat-inputs {
  margin-bottom: 40px;
  display: flex;
  background-color: white;

  input {
    line-height: 3;
    width: 100%;
    border: 1px solid rgb(233, 231, 231);
    border-left: none;
    border-bottom: none;
    border-right: none;
    border-bottom-left-radius: 4px;
    padding-left: 15px;
  }

  button {
    width: 145px;
    color: white;
    background: #1877F2;
    border-color: #999;
    border-bottom: none;
    border-right: none;
    border-bottom-right-radius: 3px;
  }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .chat-box {
    width: 92vw;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .chat-box {
    width: 85vw;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .chat-box {
    width: 80vw;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .chat-box {
    width: 75vw;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .chat-box {
    width: 60vw;
  }
}
</style>
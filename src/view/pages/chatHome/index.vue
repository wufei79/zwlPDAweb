<template>
  <div class="chatHome">
    <!-- <div class="chatLeft"> -->
    <!-- <div class="title">
        <h1>myPDA</h1>
        <br/>
      </div> -->
    <!-- <div class="online-person">
        <span class="onlin-text">聊天列表</span>
        <div class="person-cards-wrapper">
          <div
            class="personList"
            v-for="conversationId in personList"
            @click="clickPerson(conversationId)"
          >
            <PersonCard
              :conversationId="conversationId"
            ></PersonCard>
          </div>
        </div>
      </div> -->
    <!-- </div> -->
    <!-- <div class="chatRight"> -->
    <!-- <router-view></router-view> -->
    <!-- <div v-if="showChatWindow">
        <ChatWindow
        :conversationId="conversationId"
        ></ChatWindow>
      </div>
    </div> -->
    <ChatWindow />
    <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
  </div>
</template>

<script>
import PersonCard from "@/components/PersonCard.vue";
import ChatWindow from "./chatwindow.vue";

//import { getFriend, getConversationList } from "@/api/getData";
export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
  },
  data() {
    return {
      // personList: [],
      // showChatWindow: false,
      // conversationId: "",
    };
  },
  mounted() {
    /* 
    getConversationList().then((res) => {
       console.log(res);
       this.personList = res;
     });
     */
    /*
    getFriend().then((res) => {
      console.log(res);
      this.personList = res;
    });
    */
  },
  methods: {
    // clickPerson(conversationId) {
    //   this.showChatWindow = true;
    //   this.chatWindowInfo = conversationId;
    //   this.personInfo = conversationId;
    //   this.conversationId = conversationId;
    //   //this.pcCurrent = info.id;
    // },
    /*
    personCardSort(id) {
      if (id !== this.personList[0].id) {
        console.log(id);
        let nowPersonInfo;
        for (let i = 0; i < this.personList.length; i++) {
          if (this.personList[i].id == id) {
            nowPersonInfo = this.personList[i];
            this.personList.splice(i, 1);
            break;
          }
        }
        this.personList.unshift(nowPersonInfo);
      }
    },
    */
  },
};
</script>

<style lang="scss" scoped>
.chatHome {
  // margin-top: 20px;
  display: flex;
  /* .chatLeft { */
    /* width: 150px; */
    /* .title {
      color: #fff;
      padding-left: 10px;
    } */
    /* .online-person {
      margin-top: 60px;
      .onlin-text {
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }
      .person-cards-wrapper {
        padding-left: 10px;
        height: 65vh;
        margin-top: 20px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar { */
    /* width: 0;  Safari,Chrome 隐藏滚动条 */
    /* height: 0; /* Safari,Chrome 隐藏滚动条 */
    /* display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
    /* }
      }
    }
  } */

  /* .chatRight {
    flex: 1; */
    /* padding-right: 30px; */
    /* .showIcon {
      position: absolute; */
    /*  top: calc(50% - 150px); 垂直居中 */
    /*  left: calc(50% - 50px); /*水平居中 */
      /* .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px; */
        // color: rgb(28, 30, 44);
      /* }
    }
  } */
}
@media only screen and (min-device-width: 768px) {
  .PaperTitle {
    padding: 0 8vh;
  }
}
@media only screen and (max-device-width: 768px) {
  .PaperTitle {
    padding: 0 3vh;
  }
}
</style>
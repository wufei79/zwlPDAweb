<template>
  <div class="chat-window">
    <div class="top">
      <div class="info-detail">
        <div class="name">{{ chatData.conversationId }}</div>
      </div>
    </div>
    <div class="botoom">
      <div class="chat-content" ref="chatContent">
        <div
          class="chat-wrapper"
          v-for="(item, index) in chatList"
          :key="item.id"
        >
          <!-- <div v-if="isSend && index == chatList.length - 1">
            <div class="chat-friend" v-if="item.uid !== '1001'">
              <div class="info-time">
                <img :src="item.headImg" alt="" />
                <span>{{ item.name }}</span>
                <span>{{ item.time }}</span>
              </div>
              <div class="chat-text" v-if="item.chatType == 0">
                <span class="flash_cursor"></span>
              </div>
            </div> 
          </div>-->
          <div class="chat-friend" v-if="item.uid !== '1001'">
            <div class="info-time">
              <img :src="item.headImg" alt="" />
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div>
            <div class="chat-text" v-if="item.chatType == 0">
              <template v-if="isSend && index == chatList.length - 1">
                <span class="flash_cursor"></span>
              </template>
              <template v-else>
                <pre>{{ item.msg }}</pre>
              </template>
            </div>
            <div class="chat-img" v-if="item.chatType == 1">
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.extend.imgType == 1"
                style="width: 100px; height: 100px"
              />
              <el-image :src="item.msg" :preview-src-list="srcImgList" v-else>
              </el-image>
            </div>
            <div class="chat-img" v-if="item.chatType == 2">
              <div class="word-file">
                <FileCard
                  :fileType="item.extend.fileType"
                  :file="item.msg"
                ></FileCard>
              </div>
            </div>
          </div>
          <div class="chat-me" v-else>
            <div class="info-time">
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
              <img :src="item.headImg" alt="" />
            </div>
            <div class="chat-text" v-if="item.chatType == 0">
              {{ item.msg }}
            </div>
            <div class="chat-img" v-if="item.chatType == 1">
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.extend.imgType == 1"
                style="width: 100px; height: 100px"
              />
              <el-image
                style="max-width: 300px; border-radius: 10px"
                :src="item.msg"
                :preview-src-list="srcImgList"
                v-else
              >
              </el-image>
            </div>
            <div class="chat-img" v-if="item.chatType == 2">
              <div class="word-file">
                <FileCard
                  :fileType="item.extend.fileType"
                  :file="item.msg"
                ></FileCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div> -->
      <!-- <div class="emoji boxinput" @click="clickEmoji">
          <img src="@/assets/img/emoji/smiling-face.png" alt="" />
        </div> -->
      <!-- <div class="emoji-content">
          <Emoji
            v-show="showEmoji"
            @sendEmoji="sendEmoji"
            @closeEmoji="clickEmoji"
          ></Emoji>
        </div> -->
      <!-- <input class="temperature" v-model="temperature"/>
        <input class="maxTokens" v-model="maxTokens"/>
        <input class="conversationId" v-model="conversationId"/> -->
      <el-form
        :model="chatData"
        label-width="10px"
        ref="chatForm"
        class="form"
        :inline="false"
      >
        <el-form-item label="" prop="temperature">
          <el-input v-model="chatData.temperature" clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="maxTokens">
          <el-input
            v-model="chatData.maxTokens"
            placeholder=""
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="conversationId">
          <el-select
            v-model="chatData.conversationId"
            allow-create
            clearable
            filterable
            @change="changePerson(chatData.conversationId)"
          >
            <el-option
              v-for="(item, index) in personList"
              :key="`${index}+'personList'`"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- </div> -->
      <div class="chatInputs">
        <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
        <el-button class="send boxinput" :disabled="isSend" @click="sendText">
          <img src="@/assets/img/emoji/rocket.png" alt="" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { animation } from "@/util/util";
import { completion, readanswer } from "@/api/getData";

import HeadPortrait from "@/components/HeadPortrait";
import Emoji from "@/components/Emoji";
import FileCard from "@/components/FileCard.vue";
import { getConversationList } from "@/api/getData";

export default {
  components: {
    HeadPortrait,
    Emoji,
    FileCard,
  },
  // props: {
  //   frinedInfo: "",
  //   // conversationId: "",
  //   default() {
  //     return {};
  //   },
  // },
  watch: {
    frinedInfo() {
      this.getFriendChatMsg();
    },
  },
  data() {
    return {
      chatList: [],
      chatData: {
        temperature: "1",
        maxTokens: "100",
        conversationId: "",
      },
      personList: [], //人员列表
      inputMsg: "",
      // temperature: 1,
      // maxTokens: 100,
      //conversationId: "",
      showEmoji: false,
      friendInfo: "",
      srcImgList: [],
      isSend: false,
    };
  },
  created() {
    this.getPersonList();
  },
   mounted() {
    //this.getPersonList();
   },
  methods: {
    // 获取人员列表
    getPersonList() {
      getConversationList().then((res) => {
        console.log(res);
        this.personList = res;
      });
    },
    // 点击人员列表下拉框
    changePerson(val){
      //this.getFriendChatMsg(val)
    },
    
    //获取聊天记录
    getFriendChatMsg(val) {
      let params = {
        // frinedId: this.conversationId,
        frinedId: val,
      };
      getChatMsg(params).then((res) => {
        this.chatList = res;
        this.chatList.forEach((item) => {
          if (item.chatType == 2 && item.extend.imgType == 2) {
            this.srcImgList.push(item.msg);
          }
        });
        this.scrollBottom();
      });
    },

    //发送信息
    sendMsg(msgList) {
      if (this.chatData.conversationId == "") {
        this.$message.error("请先选择人员");
      } else {
        this.chatList.push(msgList);
        this.scrollBottom();
      }
    },
    //获取窗口高度并滚动至最底层
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
    //关闭标签框
    clickEmoji() {
      this.showEmoji = !this.showEmoji;
    },
    //发送文字信息
    sendText() {
      if (this.chatData.conversationId == "") {
        this.$message.error("请先选择人员");
      } else {
        if (this.inputMsg) {
          let chatMsg = {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "卧龙",
            time: new Date().toLocaleTimeString(),
            msg: this.inputMsg,
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
          };
          this.sendMsg(chatMsg);
          this.$emit("personCardSort", this.frinedInfo);
          this.inputMsg = "";
          let data = {
            // conversationId: this.conversationId,
            conversationId: this.chatData.conversationId,
            question: chatMsg.msg,
            // temperature: parseFloat(this.temperature),
            // maxTokens: parseInt(this.maxTokens),
            temperature: parseFloat(this.chatData.temperature),
            maxTokens: parseInt(this.chatData.maxTokens),
          };
          this.loading = true;
          this.isSend = true;
          let chatGPT = {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "凤雏",
            time: new Date().toLocaleTimeString(),
            msg: "",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
          };
          this.sendMsg(chatGPT);
          completion(data).then((res) => {
            this.isSend = false;
            //this.chatList[this.chatList.length-1].msg = res.message;
            readanswer(this.chatData.conversationId).then((res) => {
              this.chatList[this.chatList.length - 1].msg = res.answer;
            });
          });
          /*
        let chatMsg = {
          headImg: require("@/assets/img/head_portrait.jpg"),
          name: "卧龙",
          time: new Date().toLocaleTimeString(),
          msg: this.inputMsg,
          chatType: 0, //信息类型，0文字，1图片
          uid: "1001", //uid
        };
        this.sendMsg(chatMsg);
        this.$emit('personCardSort', this.frinedInfo.id)
        this.inputMsg = "";
        let data = {
          prompt: chatMsg.msg,
          temperature: 0,
          top_p: 1,
          model: 'text-davinci-003',
          max_tokens: 20,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: ["Human:", "AI:"]
        }
        this.loading = true
        this.isSend = true;
        let chatGPT = {
          headImg: require("@/assets/img/head_portrait1.jpg"),
          name: "凤雏",
          time: new Date().toLocaleTimeString(),
          msg: "",
          chatType: 0, //信息类型，0文字，1图片
          uid: "1002", //uid
        };
        this.sendMsg(chatGPT);
        chatgpt(data).then((res) => {
          this.isSend = false;
          this.chatList[this.chatList.length-1].msg = res.choices[0].text;
        });
        */
        } else {
          this.$message({
            message: "消息不能为空哦~",
            type: "warning",
          });
        }
      }
    },
    //发送表情
    sendEmoji(msg) {
      let chatMsg = {
        headImg: require("@/assets/img/head_portrait.jpg"),
        name: "大毛是小白",
        time: "09：12 AM",
        msg: msg,
        chatType: 1, //信息类型，0文字，1图片
        extend: {
          imgType: 1, //(1表情，2本地图片)
        },
        uid: "1001",
      };
      this.sendMsg(chatMsg);
      this.clickEmoji();
    },
    //发送本地图片
    sendImg(e) {
      let _this = this;
      console.log(e.target.files);
      let chatMsg = {
        headImg: require("@/assets/img/head_portrait.jpg"),
        name: "大毛是小白",
        time: "09：12 AM",
        msg: "",
        chatType: 1, //信息类型，0文字，1图片, 2文件
        extend: {
          imgType: 2, //(1表情，2本地图片)
        },
        uid: "1001",
      };
      let files = e.target.files[0]; //图片文件名
      if (!e || !window.FileReader) return; // 看是否支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 关键一步，在这里转换的
      reader.onloadend = function () {
        chatMsg.msg = this.result; //赋值
        _this.srcImgList.push(chatMsg.msg);
      };
      this.sendMsg(chatMsg);
      e.target.files = null;
    },
    //发送文件
    sendFile(e) {
      let chatMsg = {
        headImg: require("@/assets/img/head_portrait.jpg"),
        name: "大毛是小白",
        time: "09：12 AM",
        msg: "",
        chatType: 2, //信息类型，0文字，1图片, 2文件
        extend: {
          fileType: "", //(1word，2excel，3ppt，4pdf，5zpi, 6txt)
        },
        uid: "1001",
      };
      let files = e.target.files[0]; //图片文件名
      chatMsg.msg = files;
      console.log(files);
      if (files) {
        switch (files.type) {
          case "application/msword":
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            chatMsg.extend.fileType = 1;
            break;
          case "application/vnd.ms-excel":
          case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            chatMsg.extend.fileType = 2;
            break;
          case "application/vnd.ms-powerpoint":
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            chatMsg.extend.fileType = 3;
            break;
          case "application/pdf":
            chatMsg.extend.fileType = 4;
            break;
          case "application/zip":
          case "application/x-zip-compressed":
            chatMsg.extend.fileType = 5;
            break;
          case "text/plain":
            chatMsg.extend.fileType = 6;
            break;
          default:
            chatMsg.extend.fileType = 0;
        }
        this.sendMsg(chatMsg);
        e.target.files = null;
      }
    },
    // 发送语音
    telephone() {
      this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
    },
    //发送视频
    video() {
      this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
    },
  },
};
</script>

<style lang="scss" scoped>
.flash_cursor {
  width: 1px;
  height: 3vh;
  display: inline-block;
  background: #d6e3f5;
  opacity: 1;
  animation: glow 800ms ease-out infinite alternate;
}

@keyframes glow {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 0.5;
  }

  50% {
    opacity: 0;
  }

  75% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

.chat-window {
  width: 100%;
  height: 100%;
  /* margin-left: 20px; */
  position: relative;

  .top {
    margin-bottom: 1vh;

    &::after {
      content: "";
      display: block;
      clear: both;
    }

    .head-pic {
      float: left;
    }

    .info-detail {
      float: left;
      margin: 0.5vh 2vh 0;

      .name {
        /* font-size: 20px; */
        font-weight: 600;
        color: #fff;
      }

      .detail {
        color: #9e9e9e;
        /* font-size: 12px; */
        margin-top: 2vh;
      }
    }

    .other-fun {
      float: right;
      margin-top: 2vh;

      span {
        margin-left: 3vh;
        cursor: pointer;
      }

      // .icon-tupian {

      // }
      input {
        display: none;
      }
    }
  }

  .botoom {
    width: 100%;
    height: 80vh;
    background-color: rgb(50, 54, 68);
    border-radius: 2vh;
    /* padding: 20px; */
    box-sizing: border-box;
    position: relative;

    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      /* padding: 10px; */
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 0;
        /* Safari,Chrome 隐藏滚动条 */
        height: 0;
        /* Safari,Chrome 隐藏滚动条 */
        display: none;
        /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }

      .chat-wrapper {
        position: relative;
        word-break: break-all;

        .chat-friend {
          width: 100%;
          float: left;
          /* margin-bottom: 20px; */
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          .chat-text {
            /* max-width: 90%; */
            /* padding: 10px; */
            /* border-radius: 20px 20px 20px 5px; */
            background-color: rgb(56, 60, 75);
            color: #fff;

            &:hover {
              background-color: rgb(39, 42, 55);
            }

            pre {
              white-space: break-spaces;
            }
          }

          .chat-img {
            img {
              width: 100px;
              height: 100px;
            }
          }

          .info-time {
            /* margin: 10px 0; */
            color: #fff;
            /* font-size: 14px; */

            img {
              width: 5vh;
              height: 5vh;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10px;
            }

            span:last-child {
              color: rgb(101, 104, 115);
              /* margin-left: 10px; */
              vertical-align: middle;
            }
          }
        }

        .chat-me {
          width: 100%;
          float: right;
          margin-bottom: 2vh;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;

          .chat-text {
            float: right;
            max-width: 90%;
            /* padding: 20px; */
            border-radius: 20px 20px 5px 20px;
            /* background-color: rgb(29, 144, 245); */
            color: #fff;

            &:hover {
              background-color: rgb(26, 129, 219);
            }
          }

          .chat-img {
            img {
              max-width: 300px;
              max-height: 200px;
              border-radius: 10px;
            }
          }

          .info-time {
            margin: 10px 0;
            color: #fff;
            /* font-size: 14px; */
            display: flex;
            justify-content: flex-end;

            img {
              width: 5vh;
              height: 5vh;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 10px;
            }

            span {
              line-height: 30px;
            }

            span:first-child {
              color: rgb(101, 104, 115);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }

    .chatInputs {
      width: 90%;
      position: absolute;
      bottom: 0;
      margin: 0 3% 3vh;
      display: flex;
      .boxinput {
        width: 5vh;
        height: 5vh;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        position: relative;
        cursor: pointer;

        img {
          /* width: 30px; */
          height: 3vh;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .emoji {
        transition: 0.3s;

        &:hover {
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
        }
      }

      .inputs {
        width: 90%;
        height: 5vh;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
        padding: 1vh;
        box-sizing: border-box;
        transition: 0.2s;
        /* font-size: 20px; */
        color: #fff;
        font-weight: 100;
        margin: 0 2vw;

        &:focus {
          outline: none;
        }
      }

      /* .temperature {
        width: 20px;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border: 2px solid rgb(34, 135, 225);
        color: #fff;
      }

      .maxTokens {
        width: 40px;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border: 2px solid rgb(34, 135, 225);
        color: #fff;
      }

      .conversationId {
        width: 50px;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border: 2px solid rgb(34, 135, 225);
        color: #fff;
      } */

      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);

        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        }
      }
    }
  }
  .form {
    width: 90%;
    margin: 0 auto;
    display: flex;
    position: absolute;
    bottom: 9vh;
    margin-left: 5%;
    height: 5vh;
  }
}
::v-deep .el-input__inner {
  height: 4vh !important;
  line-height: 4vh !important;
  padding: 0px 0.8vh !important;
  font-size: 1.4vh !important;
}
.el-select-dropdown__item {
  font-size: 1.4vh !important;
}
</style>
<template>
  <div class="person-card" :class="{  }">
    <div class="info">
          <div class="info-detail">
            <div class="conversationId">{{ conversationId }}</div>
          </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    conversationId: {
      default: ''
    }
  },
  data() {
    return {
      //conversationId: '',
    }
  },
  methods: {
    isActive() {
      this.conversationId = this.conversationId
    }
  }
};
</script>

<style lang="scss" scoped>
.person-card {
  width: 250px;
  height: 40px;
  border-radius: 5px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 0px 0;
  cursor: pointer;
  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
    .info-detail {
      margin-top: 1px;
      margin-left: 0px;
      .conversationId {
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .detail {
        color: #5c6675;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 9px;
      }
    }
  }
  &:hover {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
  }
}
.activeCard {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 3px 2px 10px 0px rgba(0, 136, 255);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
}
</style>
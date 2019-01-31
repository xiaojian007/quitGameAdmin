<template>
  <el-popover
      class="fix-popover" placement="bottom-end" width="280" trigger="click">
    <el-badge class="fix-badge" slot="reference" :value="messages.length" >
      <span class="tips">
        <svg-icon icon-class="tips" />
      </span>
    </el-badge>
    <el-tabs class="fix-tabs" value="notify">
      <el-tab-pane name="notify" :label="`通知${getMessageLength(messages.notify)}`">
        <MessageBoxItem :content="messages.notify"/>
      </el-tab-pane>
      <el-tab-pane name="messages" :label="`消息${getMessageLength(messages.messages)}`">
        <MessageBoxItem :content="messages.messages"/>
      </el-tab-pane>
      <el-tab-pane name="schedule" :label="`待办${getMessageLength(messages.schedule)}`">
        <MessageBoxItem :content="messages.schedule"/>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script>
import MessageBoxItem from '@/components/MessageBoxItem'

export default {
  components: {
    MessageBoxItem
  },
  props: {
    messages: {
      type: Object,
      required: false
    }
  },
  methods: {
    getMessageLength (arr) {
      return arr && arr.length > 0 ? `(${arr.length})` : ''
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.fix-popover {
  margin-left: 25px;
}

.fix-badge {
  display: block;
  cursor: pointer;
  height: 35px;
  .tips{
    line-height: 35px;
    font-size: 20px;
    .svg-icon{
      position: relative;
      top: -7px;
    }
  }
}

</style>

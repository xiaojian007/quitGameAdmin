<template>
  <el-popover class="fix-popover" placement="bottom-end" width="280" trigger="click">
    <el-badge class="fix-badge" slot="reference" is-dot>
      <i class="el-icon-icon-bell"></i>
    </el-badge>
    <el-tabs class="fix-tabs">
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
// import MessageBoxItem from './MessageBoxItem'
export default {
  components: {
    // MessageBoxItem
  },
  props: ['messages'],
  computed: {
    getMessageLength (arr) {
      return arr && arr.length > 0 ? `(${arr.length})` : ''
    }
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
  i {
    display: block;
  }
}

</style>

<template functional>
  <div class="footerInfo">
    <div class="footerInfo__main">
      <slot>
        Copyright 
          <span class="svg-container fontcontainer">
            <svg-icon icon-class="intl"></svg-icon>
          </span>
        2019 VUE-LI3 ElementUI Admin
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .footerInfo {
    .footerInfo__main {
      color: #666;
      text-align: center;
    }
    margin-bottom: 30px;
  }
</style>

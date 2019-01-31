<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
code {
    background: #eef1f6;
    padding: 15px 16px;
    margin-bottom: 20px;
    display: block;
    line-height: 36px;
    font-size: 15px;
    font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;
}
.warn-content {
    background: rgba(66,185,131,.1);
    border-radius: 2px;
    padding: 1rem;
    line-height: 1.6rem;
    word-spacing: .05rem;
}
.components-container{
    margin: 30px 50px;
    position: relative;
}
@media screen and (max-width: 1000px) {
    .components-container{
        margin: 10px;
        position: relative;
    }
    .app-breadcrumb{
        display: none;
    }
}
</style>

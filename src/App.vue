<template>
  <div id="app" class="app">
    <div class="header">
      <ul class="nav-list">
        <li v-for="(nav, index) in navList" :key="index"
            @click="active = index" :class="{ active: active === index }">
          {{ nav }}
        </li>
      </ul>
    </div>
    <div class="content" v-if="!isLoad">
      <nginx-config v-show="active === 0" :config="config"/>
      <interface-config v-show="active === 1" :config="config"/>
      <hosts-config v-show="active === 2" :config="config"/>
    </div>
  </div>
</template>

<script>
  import NginxConfig from "./pages/Nginx.vue";
  import HostsConfig from "./pages/Hosts.vue";
  import InterfaceConfig from "./pages/Interface.vue";

  export default {
    name: "App",
    components: {
      NginxConfig,
      HostsConfig,
      InterfaceConfig,
    },
    data() {
      return {
        active: 0,
        navList: ["nginx", "interface", "hosts"],
        isLoad: true,
        config: {},
      };
    },
    mounted() {
      this.$net("http://localhost:3000/config/template/empty", {}, (data) => {
        this.config = data.result;
        this.isLoad = false;
      })
    },
  };
</script>
<style type="text/scss" lang="scss">
  $color1: #afd7af;
  $color_white: #fff;

  html, body, div, ul, ol, li, p, a, span, input, img, h3, h4, h2 {
    padding: 0;
    margin: 0;
    outline: none;
  }

  ul, ol, li {
    list-style: none;
  }

  input {
    font-size: 14px;
    padding: 0 10px;
    height: 24px;
    border-radius: 3px;
    border: 1px solid #e8e8e8;

    &:focus {
      border-color: $color1;
    }
  }

  body {
    font-size: 14px;
    width: 100%;
    min-width: 700px;
  }

  h3 {
    line-height: 36px;
  }

  .app {
    padding: 10px;
  }

  .content {
    border: 1px solid $color1;
    padding: 20px;
  }

  .btns {
    text-align: center;
    display: inline-block;
  }

  .btn {
    display: inline-block;
    padding: 0 10px;
    line-height: 2em;
    text-align: center;
    border: 1px solid $color1;
    border-radius: 3px;
    cursor: pointer;
    margin: 5px;
    font-size: 12px;

    &.btn-solid {
      background: $color1;
    }
  }

  .nav-list {
    height: 32px;
    width: 500px;

    &:after {
      content: "";
      display: block;
      width: 10px;
      height: 100%;
      background: $color_white;
      position: fixed;
      right: 0;
      z-index: 2;
    }

    li {
      float: left;
      width: 120px;
      text-align: center;
      line-height: 30px;
      margin-right: 5px;
      border: 1px solid $color1;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      background-color: $color1;
      position: relative;
      bottom: -1px;
      cursor: pointer;

      &.active {
        background-color: $color_white;
        border-bottom-color: $color_white;
      }
    }
  }

  .mt10 {
    margin-top: 10px;
  }

  .mt20 {
    margin-top: 20px;
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .popup-title {
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
  }

  .popup-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: rgba(0, 0, 0, 0.2);
  }

  .popup-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    margin: -100px 0 0 -80px;
    background: #fff;
    border-radius: 5px;

    input {
      width: 350px;
      display: block;
      margin: 8px auto 0;
    }
  }

  .no-data {
    color: #aaa;
    padding: 0 0 5px 5px;
    font-size: 12px;
  }

  .add-attr {
    border-top: 1px dotted #e8e8e8;
  }

  .remove-module {
    position: absolute;
    right: 1px;
    top: 1px;
    width: 20px;
    height: 20px;
    background: #f30;
    border-bottom-left-radius: 50%;
    line-height: 18px;
    text-align: center;
    text-indent: 2px;
    cursor: pointer;
    color: #fff;
  }

  .config-list {
    position: relative;
    padding: 5px 0 0 20px;
    border-left: 1px dotted #ddd;

    ul {
      padding-bottom: 10px;
    }

    li {
      display: flex;
    }

    .options-list {
      text-align: left;
      padding: 20px 12px 0;

      li {
        display: inline-block;
        border: 1px solid #afd7af;
        border-radius: 3px;
        color: #116600;
        margin: 5px 6px 0 0;
        padding: 2px 15px;
        position: relative;
        cursor: pointer;
        user-select: none;
      }

      .disabled {
        border-color: #ccc;
        color: #ccc;
        cursor: no-drop;
      }

      .selected {
        border-color: #116600;
        background: #116600;
        color: #fff;
        padding: 2px 22px 2px 8px;

        &:after {
          content: "✔";
          position: absolute;
          right: 5px;
          top: 2px;
          color: #fff;
        }
      }
    }

    .del {
      display: none;
      position: absolute;
      right: 8px;
      top: 5px;
      width: 16px;
      height: 16px;
      line-height: 14px;
      text-align: center;
      background: #f30;
      border-radius: 100%;
      cursor: pointer;

      &::before {
        content: "×";
        font-style: normal;
        color: #fff;
      }
    }
  }

  .location-config-wrap {
    background: #f8f8f8;

    .location-config {
      background: #ffffff;
    }
  }

  .pb10 {
    padding-bottom: 10px;
  }

  .mr10 {
    margin-right: 10px;
  }

  .ml5 {
    margin-left: 5px;
  }

  .inline-block {
    display: inline-block;
  }

  .float-right {
    float: right;
  }

  .float-left {
    float: left;
  }

  .config-title {
    overflow: hidden;
  }

  .input-div {
    display: flex;
    padding: 5px 5px 5px 12px;
    margin-bottom: 3px;
    background: #f2f2f2;

    .value {
      border: none;
      height: 24px;
      line-height: 24px;
      flex: 1;
    }

    .label {
      float: left;
      min-width: 10em;
      text-align: right;
      padding-right: 12px;
      line-height: 24px;
      height: 24px;
      white-space: nowrap;
    }

    border-radius: 5px;
    border: 1px solid #e8e8e8;
  }

  .config-wrap {
    padding-top: 55px;
    position: relative;
  }

  .config-top-title {
    position: absolute;
    left: 0;
    top: -40px;
  }

  .type-label {
    display: inline-block;
    width: 60px;
    position: relative;
    top: -5px;
    margin-left: 5px;
  }

  .radio, .checkbox {
    height: 18px;
  }
</style>

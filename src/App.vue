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
  @import "./assets/css/index.scss";
</style>

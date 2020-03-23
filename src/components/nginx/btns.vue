<template>
  <div class="btns">
    <div class="btn" v-if="checkModule(name)" @click="add(1)">
      新增{{ name }}子模块
    </div>
    <div class="btn" v-if="checkProperty(name)" @click="add(2)">
      添加{{ name }}子属性
    </div>
    <nginx-popup v-model="showPopup" :type="type" :name="name" :data="data" :source="source"/>
  </div>
</template>
<script>
  import config from "../../config/config";

  export default {
    name: "nginxBtns",
    props: {
      value: {
        type: [Object, Array],
      },
      name: {
        type: String,
        default: "",
      },
      data: {
        type: [Object, Array],
      },
      source: {
        type: [Object],
      },
    },
    data() {
      return {
        showPopup: false,
        type: 1,
      };
    },
    methods: {
      checkModule(name) {
        return !!config.modules[name];
      },
      checkProperty(name) {
        return !!config.propertys[name];
      },
      add(type) {
        this.type = type;
        this.showPopup = true;
      },
    },
  };
</script>

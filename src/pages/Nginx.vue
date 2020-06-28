<template>
  <div>
    <div>
      配置文件地址：
      <input v-model="config.file.nginx" class="mr10"/>
      <div class="btn btn-solid float-right" @click="saveConfig">保存配置</div>
      <div class="btn btn-solid float-right">预览配置</div>
      <div class="btn btn-solid float-right">读取配置</div>
      <div class="inline-block">
        <div class="btn btn-solid">运行</div>
        <div class="btn btn-solid">重启</div>
      </div>
    </div>
    <div class="config-wrap">
      <nginx-wrap v-for="(item, key) in config.nginx" :key="key"
                  :label="key" :value="item" :root="true" :source="config.nginx"/>
    </div>
  </div>
</template>
<script>
  export default {
    name: "NginxConfig",
    props: ["config"],
    data() {
      return {};
    },
    mounted() {
    },
    methods: {
      saveConfig() {
        this.$net("http://localhost:3000/config/nginx/save", {
          params: {
            json: JSON.stringify(this.config)
          }
        }, (data) => {
          alert(data.result);
        })
      },
    },
  };
</script>
<style lang="scss"></style>

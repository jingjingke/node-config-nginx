<template>
  <div>
    <div>
      Hosts配置文件地址：
      <input v-model="config.file.hosts" class="mr10"/>
      <div class="btn btn-solid float-right" @click="addHost">新增</div>
      <div class="btn btn-solid float-right">保存配置</div>
      <div class="btn btn-solid float-right">读取配置</div>
    </div>
    <table style="width:100%">
      <tbody>
      <tr v-for="(data, index) in config.hosts" :key="index">
        <td>
          <div class="input-div">
            <div>
              <input type="checkbox" class="checkbox" :id="'checkbox-' + index" v-model="data.comment"/>
              <label class="type-label" :for="'checkbox-' + index">注释</label>
            </div>
            <input v-model="data.ip" class="value" placeholder="例如 192.168.1.1"/>
          </div>
        </td>
        <td>
          <div class="input-div">
            <div class="label">域名</div>
            <input v-model="data.domain" class="value" placeholder="例如 www.xxx.com"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "HostsConfig",
    props: ["config"],
    data() {
      return {};
    },
    methods: {
      addHost() {
        this.config.hosts.push({
          comment: false,
          ip: "",
          domain: "",
        });
      },
    },
  };
</script>

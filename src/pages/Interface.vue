<template>
  <div>
    <div>
      本地化接口配置（读取本地JSON代替服务端接口）
      <div class="btn btn-solid float-right" @click="addInterface">新增</div>
      <div class="btn btn-solid float-right">保存</div>
    </div>
    <table style="width:100%">
      <tbody>
      <tr v-for="(data, index) in config.interface" :key="index">
        <td>
          <div class="input-div">
            <div v-for="(radio, i) in type" :key="index + '-' + i">
              <input :name="'radio-' + index" type="radio" :id="'radio-' + index + '-' + i"
                     class="radio" v-model="data.type" :value="i"/>
              <label class="type-label" :for="'radio-' + index + '-' + i">{{ type[i] }}</label>
            </div>
            <input v-model="data.agent" class="value"/>
          </div>
        </td>
        <td>
          <div class="input-div">
            <div class="label">服务端</div>
            <input v-model="data.serve" class="value"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "InterfaceConfig",
    props: ["config"],
    data() {
      return {
        type: ["文件夹", "文件"], //type0-文件夹 type1-文件
      };
    },
    methods: {
      addInterface() {
        this.config.interface.push({
          type: 0,
          agent: "",
          serve: "",
        });
      },
    },
  };
</script>

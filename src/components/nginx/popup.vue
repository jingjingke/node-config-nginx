<template>
  <div class="popup-wrap" v-show="value">
    <div class="popup-content">
      <div class="popup-title">添加{{ typeName }}</div>
      <ul class="options-list">
        <li v-for="(option, index) of optionList" :key="index" @click="clickFn(option.value)"
            :class="[{ disabled: !option.clickable },{selected: selectList.includes(option.value),}]">
          {{ option.value }}
        </li>
      </ul>
      <div class="btns mt20 mb10">
        <div class="btn" @click="closed">取消</div>
        <div class="btn btn-solid" @click="add">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
  import config from "../../config/config";

  export default {
    name: "nginxPopup",
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      type: {
        type: Number,
        default: 1,
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
        optionList: [],
        selectList: [],
      };
    },
    methods: {
      closed() {
        this.$emit("input", false);
      },
      add() {
        let thaaat = this;
        if (thaaat.type === 1) {
          thaaat.selectList.forEach((select) => {
            if (Object.prototype.hasOwnProperty.call(thaaat.source, select)) {
              if (thaaat.source[select] instanceof Array) {
                if (
                  Object.prototype.hasOwnProperty.call(config.especial, select)
                ) {
                  if (config.especial[select] === 1) {
                    thaaat.source[select].push({
                      root: [],
                    });
                  } else if (config.especial[select] === 2) {
                    thaaat.source[select].push({
                      label: "",
                      value: [],
                    });
                  }
                } else if (config.complex.includes(select)) {
                  thaaat.source[select].push({
                    label: "",
                    value: {
                      root: [],
                    },
                  });
                } else {
                  thaaat.source[select] = [];
                }
              } else if (thaaat.source[select] instanceof Object) {
                for (let key in thaaat.source[select]) {
                  if (key === "root") {
                    thaaat.source[select].root = [];
                  } else {
                    delete thaaat.source[select][key];
                  }
                }
              }
            } else if (
              Object.prototype.hasOwnProperty.call(config.especial, select)
            ) {
              if (config.especial[select] === 1) {
                thaaat.$set(thaaat.source, select, [{root: []}]);
              } else if (config.especial[select] === 2) {
                thaaat.$set(thaaat.source, select, [{label: "", value: []}]);
              }
            } else {
              thaaat.$set(thaaat.source, select, {root: []});
            }
          });
        } else if (this.type === 2) {
          this.selectList.forEach((select) => {
            let obj = {
              label: select,
              value: "",
            };
            if (this.data instanceof Array) {
              this.data.push(obj);
            } else if (
              this.data instanceof Object &&
              this.data.root instanceof Array
            ) {
              this.data.root.push(obj);
            }
          });
        }
        this.closed();
      },
      clickFn(value) {
        let index = this.selectList.indexOf(value);
        if (index > -1) {
          this.selectList.splice(index, 1);
        } else {
          this.selectList.push(value);
        }
      },
      watchOptions() {
        if (this.options) {
          let array = [];
          this.options.forEach((item) => {
            array.push({
              value: item,
              clickable: true,
            });
          });
          this.optionList = array;
        }
      },
    },
    mounted() {
      this.watchOptions();
    },
    computed: {
      typeName() {
        return this.type === 1 ? "模块" : "属性";
      },
      options() {
        return config[this.type === 1 ? "modules" : "propertys"][this.name];
      },
    },
    watch: {
      value(value) {
        if (!value) {
          this.selectList = [];
        }
      },
      options: "watchOptions",
    },
  };
</script>

<template>
  <div v-if="type === '0'">
    <div class="config-top-title" v-if="root">
      <nginx-btns name="nginx" :value="value" :data="value" :source="source"/>
      <h3 class="float-left mr10">nginx</h3>
    </div>
    <div class="input-div" v-for="(item, index) in value" :key="index">
      <div class="label">{{ item.label }}</div>
      <input class="value" v-model="item.value"/>
    </div>
  </div>
  <div v-else-if="type === '1'">
    <div class="config-title">
      <nginx-btns :name="attr" :value="value" :data="value" :source="source"/>
      <h3 class="float-left mr10">
        {{ label }}
        <input class="ml5" v-model="source.label"/>
      </h3>
    </div>
    <div class="config-list" v-show="value.length > 0">
      <div class="input-div" v-for="(item, index) in value" :key="index">
        <div class="label">{{ item.label }}</div>
        <input class="value" v-model="item.value"/>
      </div>
    </div>
  </div>
  <div v-else-if="type === '2'">
    <div class="config-title">
      <nginx-btns :name="attr" :value="value" :data="value" :source="source"/>
      <h3 class="float-left mr10">{{ label }}</h3>
    </div>
    <div class="config-list">
      <nginx-wrap v-for="(sub, key) in value" :value="sub" :key="key" :label="key" :source="source"/>
    </div>
  </div>
</template>
<script>
  export default {
    name: "nginxItem",
    props: {
      value: {
        type: [Object, Array],
      },
      root: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: "",
      },
      type: {
        type: String,
        default: "",
      },
      source: {
        type: [Object],
      },
    },
    computed: {
      attr() {
        return this.label.split(" ")[0];
      },
    },
  };
</script>

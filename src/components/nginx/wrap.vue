<template>
  <div :class="{ 'config-list': root }">
    <nginx-item v-if="label === 'root'" type="0" :value="value" :root="root" :source="source"/>
    <template v-else-if="checkType(value) === 'Array'">
      <template v-if="value[0].root instanceof Array">
        <nginx-wrap v-for="(sub, index2) of value" :key="index2" :value="sub" :label="label" :source="source"/>
      </template>
      <template v-else>
        <div v-for="(parent, index) of value" :key="index">
          <nginx-item v-if="checkType(parent.value) === 'Array'"
                      type="1" :value="parent.value" :label="label" :source="parent"/>
          <nginx-wrap v-else-if="checkType(parent.value) === 'Object'"
                      :value="parent.value" :label="parent.label || label" :source="source"/>
        </div>
      </template>
    </template>
    <nginx-item v-else-if="checkType(value) === 'Object'"
                type="2" :value="value" :label="label" :source="value"/>
  </div>
</template>
<script>
  export default {
    name: "nginxWrap",
    props: {
      label: {
        type: String,
        default: "",
      },
      value: {
        type: [Object, Array],
      },
      root: {
        type: Boolean,
        default: false,
      },
      source: {
        type: [Object],
      },
    },
    methods: {
      checkType(value) {
        if (value instanceof Array) {
          return "Array";
        } else if (value instanceof Object) {
          return "Object";
        } else {
          return "";
        }
      },
    },
  };
</script>

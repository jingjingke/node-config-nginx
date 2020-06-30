<template>
  <div class="preview" v-if="visible" @click="visible=false">
    <div class="preview-content" @click.stop="contentClick">
      <div class="preview-pre">
        <pre v-html="content"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "preview",
    props: {
      'visible': {
        type: Boolean,
        default: false
      },
      'content': {
        type: String,
        default: ''
      },
    },
    methods: {
      contentClick() {
      }
    }
  };
</script>

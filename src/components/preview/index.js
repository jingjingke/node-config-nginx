import Vue from 'vue';
import preview from './index.vue';

const PreviewVue = Vue.extend(preview);

let instance = new PreviewVue({
  el: document.createElement('div')
});

const Index = function (content) {
  instance.content = content;
  instance.visible = true;

  document.body.appendChild(instance.$el);
}

export default Index;
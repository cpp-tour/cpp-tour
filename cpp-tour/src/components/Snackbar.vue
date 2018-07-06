<template>
  <div class="box fadeInUp" v-bind:class="{ 'is-hidden': !isMounted, 'animated': isMounted }">
    <h2 class="title is-4">{{ titleText }}</h2>
    <p class="box-message" v-html="messageText"></p>
    <div class="buttons is-right">
      <span class="button is-danger" @click="$emit('cancel')" v-html="cancelText"></span>
      <span class="button is-success" @click="$emit('success')" v-html="successText"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Snackbar extends Vue {
  @Prop() public titleText!: string;
  @Prop() public successText!: string;
  @Prop() public cancelText!: string;
  @Prop() public messageText!: string;
  protected isMounted: boolean = false;

  protected mounted() {
    setTimeout(() => this.isMounted = true, 500);
  }
}
</script>

<style scoped lang="scss">
.box {
  position: fixed;
  z-index: 9999;
  bottom: 2rem;
  right: 2rem;
  min-width: 300px;
  max-width: 400px;
  margin-left: 2em;
  @media(max-width: 320px) {
    min-width: 280px;
  }
}

.box-message {
  margin-bottom: 1rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}

.animated {
  animation-duration: 0.25s;
  animation-fill-mode: both;
}

</style>

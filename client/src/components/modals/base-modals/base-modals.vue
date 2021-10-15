<template>
  <div
    class="base-modal"
    :class="{ show: isOpen }"
    v-if="isOpen"
    @click="$emit('close')"
  >
    <div class="modal-dialog" @click.stop>
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title me-5">{{ title }}</h4>
          <button
            type="button"
            class="btn-close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="$emit('close')"
          >
            Закрыть
          </button>
          <button type="button" class="btn btn-success" @click="action">
            Применить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModals",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      require: true,
    },
    action: {
      type: Function,
    },
  },
  setup(props, context) {
    console.log(props);
  },
};
</script>

<style lang="scss">
@import "./base-modals";
</style>

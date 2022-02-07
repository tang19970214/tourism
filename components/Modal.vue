<template>
  <transition>
    <div class="fixed top-0 left-0 p-6 md:p-10 box-border w-full min-h-screen flex justify-center z-[999]" :class="`items-${align}`" v-show="openModal">
      <transition name="opacityTransition">
        <div class="max-h-[90vh] bg-white rounded-md z-50 pb-2 overflow-y-auto absolute" :class="width">
          <!-- header -->
          <div class="px-4 pt-2 sticky top-0 z-10 bg-white">
            <div class="w-full flex items-center justify-between border-b">
              <strong class="text-xl border-b-4 border-blue-400">{{ title }}</strong>
              <span class="cursor-pointer" @click="closeModal()">
                <img class="w-4" src="~/static/images/close.png" alt="關閉">
              </span>
            </div>
          </div>

          <!-- body -->
          <div class="px-4">
            <slot></slot>
          </div>
        </div>
      </transition>

      <transition name="opacityTransition">
        <div class="bg-gray-700 opacity-75 fixed top-0 left-0 w-full h-full z-40"></div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    openModal: {
      type: Boolean,
      required: true,
      default: false,
    },
    width: {
      type: [Number, String],
      required: false,
      default: "w-1/2",
    },
    align: {
      type: String,
      required: false,
      default: "center",
    },
    title: {
      type: String,
      required: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
  watch: {
    openModal(bol) {
      if (bol) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
};
</script>
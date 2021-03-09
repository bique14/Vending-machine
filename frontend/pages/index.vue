<template>
  <div>
    <span class="text-4xl">{{ count }}</span>
    <button class="border bg-red-200 p-4" @click="decreaseCount()">-</button>
    <button class="border bg-red-200 p-4" @click="increaseCount()">+</button>
  </div>
</template>
<script>
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increaseCount() {
      this.count = this.count + 1;
    },

    decreaseCount() {
      this.count = this.count - 1;
    },
  },
};
</script>

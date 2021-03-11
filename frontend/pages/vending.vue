<template>
  <div>
    vending.vue
    {{ $route.query }}
    <button class="border bg-red-200 p-4" @click="logState()">
      check state
    </button>
    <div class="flex">
      <li
        v-for="item in products"
        :key="item.id"
        class="list-none bg-yellow-200"
      >
        <div class="flex flex-col">
          <img :src="item.image" />
          <h1>{{ item.name }}</h1>
          <span>Price: {{ item.price }}</span>
          <button>Buy</button>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { location: "", products: [] };
  },
  async mounted() {
    const { location } = this.$route.query;
    this.location = location;

    const products = await this.fetchProducts();
    this.products = products;
  },
  methods: {
    async fetchProducts() {
      // Mock api https://designer.mocky.io/design/confirmation
      const resp = await fetch(
        "https://run.mocky.io/v3/c882e6dd-b1df-403e-842f-5acd84f115a8"
      );
      const respJson = await resp.json();
      return respJson;
    },
    logState() {
      console.log(this.location);
      console.log(this.products);
      this.products.forEach((p) => console.log(p.name));
    },
  },
};
</script>

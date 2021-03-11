<template>
  <div class="bg-yellow-100 relative">
    <h1 class="font-bold text-center text-2xl py-4">ADMIN</h1>
    <div class="flex flex-col">
      <div
        v-for="location in locations"
        :key="location"
        class="mx-10 mb-10 bg-red-100 rounded"
      >
        <h1 class="font-bold text-2xl m-4 px-2 bg-white">
          Location: {{ location }}
        </h1>
        <div
          v-for="(product, index) in productsByLocation"
          :key="index"
          class="w-5/6 mx-auto my-6"
        >
          <div class="grid grid-cols-4 gap-4">
            <li
              v-for="item in product[location]"
              :key="item._id"
              class="list-none"
            >
              <div class="flex flex-col border">
                <img :src="item.image" class="rounded-t h-56 object-cover" />
                <div class="border-t border-black px-2 py-1 bg-white">
                  <div class="flex justify-between text-xs">
                    <h1
                      v-if="item.remaining < 10"
                      class="font-bold text-red-500 text-lg inline whitespace-nowrap overflow-ellipsis overflow-hidden"
                    >
                      {{ item.name }}
                    </h1>
                    <h1
                      v-else
                      class="font-bold text-lg inline whitespace-nowrap overflow-ellipsis overflow-hidden"
                    >
                      {{ item.name }}
                    </h1>
                    <span
                      v-if="item.remaining == 0"
                      class="text-red-400 whitespace-nowrap self-center"
                    >
                      Out of stock
                    </span>
                    <span
                      v-else-if="item.remaining < 10"
                      class="text-red-400 self-center"
                    >
                      ({{ item.remaining }}/{{ item.total }})
                    </span>
                    <span v-else class="text-gray-400 self-center">
                      ({{ item.remaining }}/{{ item.total }})
                    </span>
                  </div>
                  <span>Price: {{ item.price }} THB</span>
                  <div class="flex my-1">
                    <button
                      v-if="item.remaining < 100"
                      class="flex-1 bg-gray-300 py-1 rounded mr-2 bg-yellow-300 font-bold hover:bg-yellow-400"
                      @click="addOneProduct(item._id)"
                    >
                      ADD 1
                    </button>
                    <button
                      v-else
                      class="flex-1 bg-gray-300 py-1 rounded mr-2 text-gray-400 bg-gray-200 font-bold cursor-not-allowed"
                    >
                      ADD 1
                    </button>
                    <button
                      v-if="item.remaining < 100"
                      class="flex-1 bg-gray-300 py-1 rounded bg-green-500 text-white font-bold hover:bg-green-600"
                      @click="restock(item._id)"
                    >
                      RESTOCK
                    </button>
                    <button
                      v-else
                      class="flex-1 bg-gray-300 py-1 rounded mr-2 text-gray-400 bg-gray-200 font-bold cursor-not-allowed"
                    >
                      RESTOCK
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: "System Admin 🤓",
  },
  data() {
    return { products: [], productsByLocation: {}, locations: [] };
  },
  async mounted() {
    const products = await this.fetchProducts();
    this.products = products;
    this.constructProducts();
    this.notification();
  },
  methods: {
    async fetchProducts() {
      const resp = await fetch(`http://localhost:3001/admin`);
      const respJson = await resp.json();
      return respJson;
    },
    notification() {
      this.locations.forEach((location) => {
        this.productsByLocation.forEach((product) => {
          product[location] &&
            product[location].forEach((pd) => {
              if (pd.remaining < 10) {
                const { name, remaining } = pd;
                alert(`${name} nearly out of stock! \n(${remaining} remain)`);
              }
            });
        });
      });
    },
    constructProducts() {
      const locations = [...new Set(this.products.map((p) => p.location))];
      const obj = locations.map((l) => {
        return { [l]: this.products.filter((p) => p.location == l) };
      });
      this.locations = locations;
      this.productsByLocation = obj;
    },
    async addOneProduct(_id) {
      const url = `http://localhost:3001/admin/product/add`;
      const payload = { id: _id };

      const resp = await fetch(url, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(payload),
      });

      window.location.reload();
    },
    async restock(_id) {
      const url = `http://localhost:3001/admin/product/restock`;
      const payload = { id: _id };

      const resp = await fetch(url, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(payload),
      });

      window.location.reload();
    },
  },
};
</script>

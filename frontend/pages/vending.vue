<template>
  <div class="flex flex-col">
    <div class="bg-yellow-200">
      <h1 class="font-bold text-2xl text-center py-4">Vending Machine</h1>
    </div>
    <div class="mt-4">
      <div class="flex w-full justify-center">
        <h1 v-if="products.status == 404" class="w-full text-center">
          Oops! Location not found 🤭
        </h1>
        <div v-else class="flex bg-red-100 p-10 rounded-t-lg">
          <div class="grid grid-cols-4 gap-4 bg-white">
            <li
              v-for="item in products"
              :key="item.id"
              class="list-none bg-white w-52"
            >
              <div class="flex flex-col border border-black rounded">
                <img :src="item.image" class="rounded-t h-56 object-cover" />
                <div class="border-t border-black px-2 py-1">
                  <div class="flex justify-between text-xs">
                    <h1
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
                </div>
                <div class="flex justify-end mr-2 mb-2">
                  <button
                    v-if="item.remaining > 0 && coin >= item.price"
                    class="font-bold bg-yellow-300 px-6 py-1 rounded hover:bg-yellow-400"
                    @click="purchase(item._id)"
                  >
                    Buy
                  </button>
                  <button
                    v-else-if="item.remaining > 0 && coin < item.price"
                    class="font-bold text-gray-400 bg-gray-200 px-6 py-1 rounded cursor-not-allowed"
                  >
                    Buy
                  </button>
                  <button
                    v-else
                    class="font-bold text-gray-400 bg-gray-200 px-6 py-1 rounded cursor-not-allowed"
                  >
                    Out of stock
                  </button>
                </div>
              </div>
            </li>
          </div>
          <div class="bg-blue-200 w-60 flex flex-col justify-between p-4">
            <div>
              <div>
                <h1
                  class="bg-gray-100 text-red-400 font-bold text-center rounded p-3 text-lg"
                >
                  {{ location }} vending machine
                </h1>
                <div class="flex mt-4">
                  <span class="self-center mr-2 font-bold cursor-default"
                    >COIN</span
                  >
                  <span
                    class="flex-1 bg-black text-right text-green-400 font-bold inline-block p-2"
                    >{{ coin }}.00</span
                  >
                </div>
              </div>
              <button
                class="bg-green-400 font-bold w-full py-4 my-2 rounded hover:bg-green-600"
                @click="insertCoin()"
              >
                Insert coin
              </button>
              <div
                class="grid grid-cols-3 gap-1 list-none bg-gray-200 cursor-default mt-4"
              >
                <li class="bg-gray-100 border text-center py-1">1</li>
                <li class="bg-gray-100 border text-center py-1">2</li>
                <li class="bg-gray-100 border text-center py-1">3</li>
                <li class="bg-gray-100 border text-center py-1">4</li>
                <li class="bg-gray-100 border text-center py-1">5</li>
                <li class="bg-gray-100 border text-center py-1">6</li>
                <li class="bg-gray-100 border text-center py-1">7</li>
                <li class="bg-gray-100 border text-center py-1">8</li>
                <li class="bg-gray-100 border text-center py-1">9</li>
                <li class="bg-gray-100 border text-center py-1 col-span-3">
                  0
                </li>
              </div>
            </div>
            <div class="w-full bg-black h-20">:)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/index.css";

export default {
  data() {
    return { location: "", coin: 15, products: [] };
  },
  async mounted() {
    const { location } = this.$route.query;
    this.location = location;

    const products = await this.fetchProductsByLocation();
    this.products = products;
  },
  methods: {
    async fetchProductsByLocation() {
      // Mock api https://designer.mocky.io/design/confirmation
      // "https://run.mocky.io/v3/c882e6dd-b1df-403e-842f-5acd84f115a8"
      const resp = await fetch(
        `http://localhost:3001/vending/location?id=${this.location}`
      );
      const respJson = await resp.json();
      return respJson;
    },
    async purchase(_id) {
      const url = `http://localhost:3001/vending/purchase`;
      const payload = {
        id: _id,
        quantity: 1,
      };

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
    insertCoin() {
      this.coin = this.coin + 5;
    },
    logState() {
      console.log(this.location);
      console.log(this.products);
      this.products.forEach((p) => console.log(p.name));
    },
  },
};
</script>

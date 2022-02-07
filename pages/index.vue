<template>
  <section class="w-full h-screen min-h-screen">
    <client-only>
      <l-map ref="map" :zoom="zoom" :center="center" :minZoom="3" :maxZoom="16">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <!-- <l-marker :lat-lng="markerLatLng" :icon="icon"></l-marker> -->
        <template v-for="(item, idx) of list">
          <l-marker :lat-lng="[item.Position.PositionLat, item.Position.PositionLon]" :icon="icon" :key="idx">
            <l-popup>
              <strong class="text-xl">{{item.ScenicSpotName}}</strong>
              <p class="text-base">地址：{{item.Address}}</p>
              <p class="text-base">聯絡電話：{{item.Phone}}</p>
              <p class="text-base">開放時段：{{item.OpenTime}}</p>
              <a class="text-base text-blue-400 underline cursor-pointer" @click="viewDetail(item)">詳細資訊</a>
            </l-popup>
          </l-marker>
        </template>
      </l-map>
    </client-only>

    <Modal :title="`${modalContent.ScenicSpotName} 詳細資訊`" :openModal="openMoal" @closeModal="openMoal = false">
      <div class="w-full py-2 flex flex-col gap-2">
        <div class="w-full flex">
          <label class="min-w-[85px]">地址：</label>
          <p class="tracking-wider">{{modalContent.Address || "暫無"}}</p>
        </div>
        <div class="w-full flex">
          <label class="min-w-[85px]">聯絡電話：</label>
          <p class="tracking-wider">{{modalContent.Phone || "暫無"}}</p>
        </div>
        <div class="w-full flex">
          <label class="min-w-[85px]">開放時段：</label>
          <p class="tracking-wider">{{modalContent.OpenTime || "暫無"}}</p>
        </div>
        <div class="w-full flex">
          <label class="min-w-[85px]">票價資訊：</label>
          <p class="tracking-wider">{{modalContent.TicketInfo || "暫無"}}</p>
        </div>
        <div class="w-full flex">
          <label class="min-w-[85px]">路線資訊：</label>
          <p class="tracking-wider">{{modalContent.TravelInfo || "暫無"}}</p>
        </div>
        <div class="w-full flex">
          <label class="min-w-[85px]">描述：</label>
          <p class="tracking-wider">{{modalContent.Description || "暫無"}}</p>
        </div>
        <div class="w-full flex">
          <label class="min-w-[85px]">描述詳情：</label>
          <p class="tracking-wider">{{modalContent.DescriptionDetail || "暫無"}}</p>
        </div>
        <div class="w-full flex">
          <label class="min-w-[85px]">備註：</label>
          <p class="tracking-wider">{{modalContent.Remark || "暫無"}}</p>
        </div>
      </div>
    </Modal>
  </section>
</template>
   
<script>
import axios from "axios";

export default {
  name: "IndexPage",
  data() {
    return {
      zoom: 5,
      center: [23.973875, 120.982024],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icon: null,

      list: [],
      openMoal: false,
      modalContent: {},
    };
  },
  methods: {
    getApi() {
      axios
        .get(
          "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24top=30&%24format=JSON"
        )
        .then((res) => {
          const { data } = res;
          this.list = data;
        });
    },
    viewDetail(item) {
      console.log(item);
      this.modalContent = item;
      this.openMoal = true;
    },
  },
  mounted() {
    this.$nextTick(async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this.center = [lat, lon];
      });
      this.zoom = 8;
    });

    this.icon = L.icon({
      iconUrl: require("~/static/images/marker.png"),
      // "https://cdn-icons.flaticon.com/png/512/2776/premium/2776067.png?token=exp=1643948827~hmac=e7b56e2dd9fe177e8db3c8ae1838b4aa",
    });

    this.getApi();
  },
};
</script>

<style scoped>
::v-deep .leaflet-popup-content p {
  margin: 10px 0;
}
</style>
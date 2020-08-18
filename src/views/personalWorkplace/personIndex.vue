<template>
  <div>
    <div>
      <div>
        <router-view ></router-view>
        <personNav></personNav>
        <siderNav></siderNav>
      </div>
    </div>
  </div>
</template>

<script>
import personNav from "@/components/personNav";
import siderNav from "@/components/siderNav";
export default {
  components: {
    personNav,
    siderNav,
  },
  data() {
    return {
      docid: 0,
      userid: parseInt(window.sessionStorage.getItem("UserId")),
    };
  },
  methods: {
    toModel() {
      this.$router.push("/model");
    },
  },
};
</script>

<style></style>

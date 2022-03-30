<template>
  <div class="navbar-wrapper">
    <div class="container">
      <el-menu
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeIndex"
        router
        @select="handleSelect"
      >
        <el-menu-item index="index" :route="{ name: 'index' }"
          >ホーム</el-menu-item
        >
        <el-menu-item index="search" :route="{ name: 'search' }"
          >検索</el-menu-item
        >
        <el-menu-item index="about" :route="{ name: 'about' }"
          >アプリについて</el-menu-item
        >
        <!-- <el-menu-item index="1"
          ><router-link to="/">ホーム</router-link></el-menu-item
        >
        <el-menu-item index="2"
          ><router-link to="/search">検索</router-link></el-menu-item
        >
        <el-menu-item index="3"
          ><router-link to="/about">アプリについて</router-link></el-menu-item
        > -->

        <!-- <el-submenu index="3">
          <template v-slot:title>Support</template>
          <el-menu-item index="3-1"
            ><a href="https://github.com/" target="_blank">GitHub</a>
          </el-menu-item>
        </el-submenu> -->
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '',
    }
  },
  watch: {
    $route() {
      this.handleSelect()
    },
  },
  mounted() {
    this.handleSelect()
  },
  methods: {
    handleSelect() {
      this.activeIndex = this.$route.name
    },
  },
}
</script>
<style lang="scss" scoped>
.el-menu {
  border-bottom: none;
}
.navbar-wrapper {
  background-color: #545c64;
}
.el-menu-item {
  padding: 0 20px;
}
.el-menu--popup {
  a {
    color: #fff;
  }
}
</style>

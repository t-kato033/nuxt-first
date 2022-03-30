<template>
  <div class="container">
    <div class="list content">
      <p v-if="bookCount">{{ bookCount }}件の読書情報が記録されています。</p>
      <p v-else>
        読書した本を記録するアプリです。<br />検索画面から本を検索し、読書情報を登録してください。
      </p>
      <BookInfo
        v-for="(b, i) of books"
        :key="b.isbn"
        :linkable="true"
        :book="b"
        :index="i + 1"
      ></BookInfo>
      <div>
        <el-pagination
          v-if="bookCount"
          background
          layout="prev, pager, next"
          :total="bookCount"
          :page-size="3"
          @current-change="onchange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BookInfo from '@/components/BookInfo.vue'

export default {
  name: 'Home',
  components: {
    BookInfo,
  },
  data() {
    return {
      books: [],
    }
  },
  computed: mapGetters(['bookCount', 'getRangeByPage']),
  mounted() {
    this.books = this.getRangeByPage(1)
  },
  methods: {
    onchange(page) {
      this.books = this.getRangeByPage(page)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>

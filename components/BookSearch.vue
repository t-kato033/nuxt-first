<template>
  <div id="search" class="container">
    <div class="content">
      <el-form :inline="true" @submit.native.prevent="newSearchBooks">
        <el-form-item>
          <el-input
            ref="input"
            v-model="form.keyword"
            type="text"
            size="large"
            placeholder="キーワードを入力"
            @focus="$refs.input.select()"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newSearchBooks">検索</el-button>
        </el-form-item>
      </el-form>
      <!-- <p v-if="searchState >= 0">現在、{{ currentPage }}ページ目です。</p>
      <p v-else>キーワードを入力して、本を探してください。</p> -->
    </div>
    <hr />
    <div class="content">
      <el-pagination
        v-if="searchState > 0"
        background
        layout="prev, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="searchState"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
      <BookInfo
        v-for="(b, i) of books"
        :key="b.isbn"
        :linkable="true"
        :book="b"
        :index="i + 1"
      ></BookInfo>
      <el-pagination
        v-if="searchState > 0"
        background
        layout="prev, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="searchState"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
import BookInfo from '@/components/BookInfo.vue'
Vue.prototype.$http = (url, opts) => fetch(url, opts)

export default {
  name: 'BookSearch',
  components: {
    BookInfo,
  },
  data() {
    return {
      form: {
        keyword: '',
      },
      books: [],
      searchIndex: 0,
      searchState: -1,
      currentPage: 1,
      pageSize: 10,
      rules: {
        keyword: [
          {
            required: true,
            message: 'キーワードを入力してください。',
          },
        ],
      },
    }
  },
  computed: mapGetters(['getSearchResult', 'getPageCount', 'getKeyword']),
  mounted() {
    // storeにデータがあれば反映させる
    if (this.getSearchResult) {
      const data = this.getSearchResult
      this.currentPage = this.getPageCount
      this.form.keyword = this.getKeyword
      this.searchState =
        data.totalItems + (this.currentPage - 1) * this.pageSize
      this.setResult(data)
    }
  },
  created() {
    // debounceで連続でクリックしても、一度しかapiをcallしない
    this.searchBooks = debounce(this.searchBooks, 200)
  },
  methods: {
    ...mapActions([
      'updateSearchResult',
      'updatePageCount',
      'clearSearchData',
      'updateKeyword',
    ]),
    handleCurrentChange(val) {
      // 表示したいページで再度APIを呼ぶ
      // console.log(`current page: ${val}`)
      this.updatePageCount(this.currentPage) // storeにページ情報を保存しておく
      this.searchBooks()
    },
    newSearchBooks() {
      // データを初期化後に検索する
      this.books = []
      this.searchIndex = 0
      this.searchState = -1
      this.currentPage = 1
      if (this.form.keyword.length) {
        this.searchBooks()
      }
    },
    setResult(data) {
      for (const b of data.items) {
        const authors = b.volumeInfo.authors
        const price = b.saleInfo.listPrice
        const img = b.volumeInfo.imageLinks
        this.books.push({
          id: b.id,
          title: b.volumeInfo.title,
          author: authors ? authors.join(',') : '',
          price: price ? price.amount : '-',
          publisher: b.volumeInfo.publisher,
          published: b.volumeInfo.publishedDate,
          readerLink: b.accessInfo.webReaderLink,
          readerStatus: b.accessInfo.accessViewStatus,
          image: img ? img.smallThumbnail : '',
        })
      }
    },
    searchBooks() {
      this.$http(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          this.form.keyword +
          '&startIndex=' +
          (this.currentPage - 1) * this.pageSize +
          '&langRestrict=ja'
      )
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.error) {
            // console.error('サーバーエラーが発生しました。')
            // サーバーエラーが発生した場合は、検索状態を初期化して、一度HOMEへ遷移させる
            this.clearSearchData()
            this.$router.push('/')
          } else {
            this.books = []
            // console.log('data:' + JSON.stringify(data))
            this.updateSearchResult(data)
            this.updateKeyword(this.form.keyword)
            this.searchState =
              data.totalItems + (this.currentPage - 1) * this.pageSize
            this.setResult(data)
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>

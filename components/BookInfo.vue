<template>
  <div class="book-item" :class="{ linkable }" @click="onclick">
    <div class="image"><img :src="book.image" /></div>
    <div class="details">
      <ul>
        <!-- <li v-if="index">{{ index }}.</li> -->
        <li class="book-title">{{ book.title }}</li>
        <li v-if="book.price !== '-'" class="book-detail">
          <span class="book-detail-title">価格：</span>{{ book.price }}円
        </li>
        <li v-if="book.author" class="book-detail">
          <span class="book-detail-title">作者：</span>{{ book.author }}
        </li>
        <li v-if="book.publisher" class="book-detail">
          <span class="book-detail-title">出版社：</span>{{ book.publisher }}
        </li>
        <li v-if="book.published" class="book-detail">
          <span class="book-detail-title">発売日：</span
          >{{ toDate(book.published) }}
        </li>
        <!-- <li><a :href="book.readerLink" target="_brank">サンプルを見る</a></li> -->
        <li v-if="book.readerStatus !== 'NONE'" class="book-detail-button">
          <el-button
            type="primary"
            size="mini"
            @click.stop="openUrl(book.readerLink)"
            >サンプルを見る</el-button
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'BookInfo',
  props: {
    index: { type: Number, default: 0 },
    linkable: { type: Boolean, default: false },
    book: { type: Object, default: null },
  },
  methods: {
    ...mapActions(['updateCurrent']),
    onclick() {
      if (this.linkable) {
        this.updateCurrent(this.book)
        this.$router.push('/form')
      }
    },
    openUrl(url) {
      window.open(url, '_blank')
    },
    toDate(str) {
      // 年月日に変換 yyyy,yyyy-mm,yyyy-mm-dd
      if (str) {
        const strArray = str.split('-')
        let convertStr = ''
        for (let i = 0; i < strArray.length; i++) {
          if (i === 0) convertStr += strArray[0] + '年'
          else if (i === 1) convertStr += strArray[1] + '月'
          else if (i === 2) convertStr += strArray[2] + '日'
        }
        return convertStr
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.book-item {
  display: flex;
  cursor: pointer;
  margin: 20px 0;
  border: 1px solid #d3d4d6;
  &:hover {
    background-color: #ecf5ff;
  }
}
.book-item {
  ul {
    padding: 1rem;
    list-style: none;
    margin: 0;
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  .el-button {
    position: relative;
    z-index: 1;
    margin-top: 0.5em;
  }
  .image {
    min-width: 128px;
  }
  .book-title {
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .book-detail {
    font-size: 1.3rem;
  }
  .book-detail-title {
    color: #606266;
  }
  .book-detail-button {
    margin-top: auto;
  }
}
</style>

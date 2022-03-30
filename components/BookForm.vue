<template>
  <div id="form" class="container">
    <div class="content">
      <BookInfo :book="book" />
    </div>
    <hr />
    <div class="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="読了日">
          <el-date-picker v-model="form.read" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="感想" prop="memo">
          <el-input v-model="form.memo" type="textarea" size="large"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onsubmit">登録</el-button>
          <el-button type="info" @click="onback">キャンセル</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BookInfo from '@/components/BookInfo.vue'

export default {
  name: 'BookForm',
  components: {
    BookInfo,
  },
  data() {
    return {
      book: {},
      form: {
        read: new Date(),
        memo: '',
      },
      rules: {
        memo: [
          { required: true, message: '感想が未入力です。', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['current', 'getBookById']),
  },
  created() {
    if (!this.current) {
      this.$router.push('/')
    }
    this.book = Object.assign({}, this.current)
  },
  mounted() {
    const b = this.getBookById(this.book.id)
    if (b) {
      this.form.read = b.read
      this.form.memo = b.memo
    }
  },
  methods: {
    ...mapActions(['updateBook', 'updateCurrent']),
    onsubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updateBook(Object.assign({}, this.book, this.form))
          this.updateCurrent(null)
          this.$notify({
            title: '通知',
            message: this.$createElement(
              'p',
              { style: 'color: #009' },
              '読書情報の登録／更新に成功しました。'
            ),
            duration: 2000,
          })
          this.form.read = new Date()
          this.form.memo = ''
          this.$router.push('/')
        }
      })
    },
    onback() {
      this.$router.go(-1)
    },
  },
}
</script>

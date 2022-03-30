<template>
  <div id="about" class="container">
    <div class="content">
      <section>
        <h2>このアプリについて</h2>
        <p>
          Vue.jsを勉強する過程で作成しました。<br />
          『これからはじめるVue.js実践入門』(山田祥寛/著)<br />
          のサンプルコードを参考に、Nuxt.jsを使用して構築しています。
        </p>
      </section>
      <section>
        <h2>使用方法</h2>
        <p>
          検索画面から読み終えた本を検索し、本を選択すると登録画面に遷移します。<br />
          本の感想を入力し登録ボタンを押すことでホーム画面に読み終えた本が一覧として表示されます。<br />
          登録した内容は、ブラウザのローカルストレージに保存されます。
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  layout: 'default',
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.8rem;
  margin-bottom: 0.25em;
}
section + section {
  margin-top: 2rem;
}
</style>

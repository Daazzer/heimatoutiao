<template>
  <div class="index">
    <header class="index_header">
      <div class="logo">
        <span class="logo_icon iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon class="search_icon" name="search" />
        <span>搜索商品</span>
      </div>
      <router-link class="user" :to="`/personal/${id}`">
        <van-icon class="user_icon" name="user-circle-o" />
      </router-link>
    </header>
    <nav class="index_nav">
      <VanTabs v-model="active" sticky swipeable>
        <VanTab
          v-for="categoryItem in categoryItems"
          :title="categoryItem.name"
          :key="categoryItem.id"
        >
          <VanPullRefresh
            v-model="refreshing"
            @refresh="refreshNewsArticle"
            success-text="刷新成功"
          >
            <VanList
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="loadNewsArticle"
            >
              <VanCell
                v-for="newsArticleItem in newsArticleItems" :key="newsArticleItem.id"
                :title="newsArticleItem.title"
              />
            </VanList>
          </VanPullRefresh>
        </VanTab>
      </VanTabs>
    </nav>
  </div>
</template>

<script>
import {
  Tab as VanTab,
  Tabs as VanTabs,
  List as VanList,
  Cell as VanCell,
  PullRefresh as VanPullRefresh
} from 'vant'

export default {
  name: 'index',
  components: {
    VanTab,
    VanTabs,
    VanList,
    VanCell,
    VanPullRefresh
  },
  data () {
    return {
      id: -1,
      active: 0,
      categoryItems: [],
      curPageIndex: 1,
      pageSize: 10,
      newsArticleItems: [],
      refreshing: false,
      loading: false,
      finished: false,
      total: 10
    }
  },
  async mounted () {
    const userInfo = JSON.parse(localStorage.getItem('heimatoutiao_userInfo'))

    if (userInfo) {
      this.id = userInfo.id
      this.active = 1
    }

    const [categoryErr, categoryRes] = await this.$api.category()

    if (categoryErr) {
      return this.$toast.fail('获取栏目数据失败，发生错误')
    } else {
      this.categoryItems = categoryRes.data.data
    }
    this.initNewsArticle()
  },
  methods: {
    refreshNewsArticle () {
      this.initNewsArticle().then(() => {
        this.refreshing = false
        // 重置页数
        this.finished = false
        this.loading = false
        this.loadNewsArticle()
      })
    },
    async loadNewsArticle () {
      if (this.newsArticleItems.length >= this.total) {
        this.finished = true
        return
      }

      this.curPageIndex++
      const categoryId = this.categoryItems[this.active].id
      const [postErr, postRes] = await this.$api.post({ category: categoryId, pageSize: this.pageSize, pageIndex: this.curPageIndex })

      if (postErr) {
        this.$toast.fail('获取新闻数据失败，发生错误')
        this.finished = true
      // 如果页面文章数等于后台的总文章数
      } else {
        this.newsArticleItems.push(...postRes.data.data)
      }
      this.loading = false
    },
    async initNewsArticle () {
      // 初始化当前页数
      this.curPageIndex = 1
      const categoryId = this.categoryItems[this.active].id

      const [postErr, postRes] = await this.$api.post({ category: categoryId, pageSize: this.pageSize, pageIndex: 1 })

      if (postErr) {
        this.$toast.fail('获取新闻数据失败，发生错误')
      } else {
        this.total = postRes.data.total
        // 重新初始化新闻文章列表
        this.newsArticleItems = postRes.data.data
        console.log(this.newsArticleItems)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.index_header {
  height: common.baseSize(50);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f00;
  color: #fff;
  .logo_icon {
    font-size: common.baseSize(50);
    margin: 0 common.baseSize(10);
  }
  .search {
    $height: common.baseSize(34);
    display: flex;
    justify-content: center;
    align-items: center;
    height: $height;
    flex: 1;
    border-radius: $height / 2;
    background-color: rgba(255, 255, 255, 0.4);
    .search_icon {
      margin-right: common.baseSize(6);
      font-size: common.baseSize(18);
    }
  }
  .user {
    color: #fff;
    &_icon {
      display: block;
      margin: 0 common.baseSize(10);
      font-size: common.baseSize(24);
    }
  }
}
</style>

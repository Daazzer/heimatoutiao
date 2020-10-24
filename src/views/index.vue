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
              :error.sync="loadError"
              error-text="请求失败，点击重新加载"
              @load="loadNewsArticle"
            >
              <NewsArticleItem
                v-for="newsArticleItem in newsArticleItems"
                :key="newsArticleItem.id"
                :news="newsArticleItem"
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
  PullRefresh as VanPullRefresh
} from 'vant'
import NewsArticleItem from '@/components/NewsArticleItem.vue'

export default {
  name: 'index',
  components: {
    VanTab,
    VanTabs,
    VanList,
    VanPullRefresh,
    NewsArticleItem
  },
  data () {
    return {
      id: -1,
      active: 0,
      categoryItems: [],
      newsArticleItems: [],
      curPageIndex: 1,
      pageSize: 4,
      refreshing: false,
      loading: false,
      finished: false,
      loadError: false,
      total: NaN
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
        this.loadError = true
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
        this.loadError = true
      } else {
        /*
        如果数据中的type为1，说明是文章，2说明是视频
        当type值为1的时候，如果cover的数量<=2,那么就是左右结构，如果cover的数量>=3，
        那么就是上下结构
         */
        this.total = postRes.data.total
        // 重新初始化新闻文章列表
        this.newsArticleItems = postRes.data.data
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

.index_nav  {
  ::v-deep .van-tab__text {
    font-size: common.baseSize(16);
  }
  ::v-deep .van-tabs__wrap {
    height: common.baseSize(44);
  }
}
</style>

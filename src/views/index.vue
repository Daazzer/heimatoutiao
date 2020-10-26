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
      <VanTabs v-model="tabNav.active" sticky swipeable>
        <VanTab
          v-for="categoryItem in tabNav.categoryItems"
          :title="categoryItem.name"
          :key="categoryItem.id"
        >
          <VanPullRefresh
            v-model="tabNav.categoryItems[tabNav.active].refreshing"
            success-text="刷新成功"
            @refresh="refreshNewsArticle"
          >
            <van-list
              v-model="tabNav.categoryItems[tabNav.active].loading"
              :finished="tabNav.categoryItems[tabNav.active].finished"
              :error.sync="tabNav.categoryItems[tabNav.active].loadError"
              finished-text="没有更多了"
              error-text="请求失败，点击重新加载"
              @load="loadNewsArticle"
            >
              <NewsArticleItem
                v-for="newsArticleItem in tabNav.categoryItems[tabNav.active].newsArticleItems"
                :key="newsArticleItem.id"
                :news="newsArticleItem"
              />
            </van-list>
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
  PullRefresh as VanPullRefresh
} from 'vant'
import NewsArticleItem from '@/components/NewsArticleItem.vue'

export default {
  name: 'index',
  components: {
    VanTab,
    VanTabs,
    VanPullRefresh,
    NewsArticleItem
  },
  data () {
    return {
      id: JSON.parse(localStorage.getItem('heimatoutiao_userInfo')) ? JSON.parse(localStorage.getItem('heimatoutiao_userInfo')).id : -1,
      tabNav: {
        active: JSON.parse(localStorage.getItem('heimatoutiao_userInfo')) ? 1 : 0,
        categoryItems: []
      }
    }
  },
  async mounted () {
    const [categoryErr, categoryRes] = await this.$api.category()

    if (categoryErr) {
      return this.$toast.fail('获取栏目数据失败，发生错误')
    }

    // 初始化数据结构，页面优化方式
    this.tabNav.categoryItems = categoryRes.data.data.map(v => ({
      // 拿到每条，新闻文章数据项的属性
      ...v,
      newsArticleItems: [],
      pageIndex: 1,
      pageSize: 4,
      refreshing: false,
      loading: false,
      finished: false,
      loadError: false
    }))
  },
  methods: {
    refreshNewsArticle () {
      // 当前栏目
      const categoryItem = this.tabNav.categoryItems[this.tabNav.active]
      // 重置当前页索引，重置新闻文章
      categoryItem.pageIndex = 1
      // 重新开始加载
      categoryItem.finished = false
      this.loadNewsArticle(true).then(() => {
        categoryItem.refreshing = false
      })
    },
    async loadNewsArticle (refresh) {
      // 当前栏目
      const categoryItem = this.tabNav.categoryItems[this.tabNav.active]

      categoryItem.loading = true

      // 判断是否有新闻文章
      if (categoryItem.newsArticleItems.length === 0 || refresh) {
        categoryItem.pageIndex = 1
      } else {
        categoryItem.pageIndex++
      }

      const [postErr, postRes] = await this.$api.getNewsArticle({
        category: categoryItem.id,
        pageSize: categoryItem.pageSize,
        pageIndex: categoryItem.pageIndex
      })

      if (postErr) {
        return categoryItem.loadError = true
      }

      if (postRes.data.data.length < categoryItem.pageSize) {
        // 返回数据条数小于当前设定的分页大小，说明是最后一条
        categoryItem.finished = true
      }

      if (refresh) {
        categoryItem.newsArticleItems = postRes.data.data
      } else {
        categoryItem.newsArticleItems.push(...postRes.data.data)
      }

      categoryItem.loading = false
    }
  },
  watch: {
    'tabNav.active' () {
      const categoryItem = this.tabNav.categoryItems[this.tabNav.active]

      // 如果当前栏目没有新闻数据，则切换时才加载
      if (categoryItem.newsArticleItems.length === 0 && !categoryItem.finished) {
        this.loadNewsArticle()
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

.index_nav {
  ::v-deep .van-tab__text {
    font-size: common.baseSize(16);
  }
  ::v-deep .van-tabs__wrap {
    height: common.baseSize(44);
  }
}
</style>

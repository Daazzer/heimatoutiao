<template>
  <div class="search">
    <van-nav-bar
      class="search-header"
      title="标题"
      right-text="搜索"
      left-arrow
      fixed
      placeholder
      @click-left="$router.back()"
      @click-right="searchArticle"
    >
      <template #title>
        <VanSearch
          class="search-input"
          v-model="searchText"
          shape="round"
          background="#f2f2f2"
          placeholder="请输入搜索关键词"
          ref="searchInput"
        />
      </template>
    </van-nav-bar>
    <main v-if="isInit">
      <div class="search-history">
        <h2>历史记录</h2>
        <van-list class="search-history_list">
          <VanCell
            class="search-history_item"
            v-for="(searchHistoryText, index) in searchHistory"
            :key="index"
            :title="searchHistoryText"
            @click="searchArticle($event, searchHistoryText)"
          />
        </van-list>
      </div>
      <div class="search-hot">
        <h2>热门搜索</h2>
        <div class="search-hot_list">
          <router-link to="#">美女</router-link>
          <router-link to="#">美女</router-link>
          <router-link to="#">美女</router-link>
          <router-link to="#">美女</router-link>
          <router-link to="#">美女</router-link>
        </div>
      </div>
    </main>
    <main v-else>
      <div class="search-result">
        <van-list class="search-result_list">
          <VanCell
            v-for="article in searchResult"
            :key="article.id"
            :title="article.title"
            :to="`/articleDetail/${article.id}`"
            is-link
          />
        </van-list>
      </div>
    </main>
  </div>
</template>

<script>
import { Search as VanSearch, Cell as VanCell } from 'vant'

export default {
  name: 'Search',
  components: {
    VanSearch,
    VanCell
  },
  data(){
    return {
      searchText: '',
      searchHistory: [],
      searchResult: [],
      isInit: true
    }
  },
  mounted () {
    this.searchHistory = JSON.parse(localStorage.getItem('heimatoutiao_searchHistory')) || []
  },
  methods: {
    async searchArticle (e, searchHistoryText) {
      this.searchText = searchHistoryText || this.searchText
      const keyword = this.searchText.trim()
      const [err, res] = await this.$api.searchArticle({ keyword })

      if (err) {
        return this.$toast.fail('搜索结果出错')
      }

      // 显示搜索结果页面结构
      this.isInit = false
      this.searchResult = res.data.data

      if (!searchHistoryText && keyword !== '') {
        this.searchHistory.push(keyword)
        const searchHistory = this.searchHistory
        // 将搜索记录存到本地
        localStorage.setItem('heimatoutiao_searchHistory', JSON.stringify(searchHistory))
      }
    }
  },
  watch: {
    searchText (oldTxt) {
      // 页面回到初始状态
      if (oldTxt === '' && this.isInit === false) {
        this.isInit = true
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@use "@/styles/common.scss";

.search {
  &-header {
    $headHeight: common.baseSize(50);
    height: $headHeight !important;
    ::v-deep {
      .van-nav-bar {
        display: flex;
        height: $headHeight;
        background-color: #f2f2f2;
        .van-icon-arrow-left, &__text {
          font-size: common.baseSize(15);
          color: #777;
        }
        &__text {
          font-size: common.baseSize(12);
          color: #202020;
        }
        @mixin navbarUtil($pos: null, $p: null) {
          position: $pos;
          padding: $p;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &__left {
          @include navbarUtil(static, 0);
          width: common.baseSize(40);
        }
        &__title {
          @include navbarUtil();
          flex: 1;
          max-width: none;
          width: 80%;
          height: common.baseSize(50);
          .search-input {
            padding: 0;
            width: 100%;
          }
        }
        &__right {
          @include navbarUtil(static, 0);
          width: common.baseSize(60);
        }
      }
    }
  }
  &-input {
    ::v-deep {
      .van-search__content {
        height: common.baseSize(38);
        background-color: #f2f2f2;
        border: 1px solid #d7d7d7;
      }
      .van-field {
        display: flex;
        align-items: center;
        font-size: common.baseSize(14);

        &__clear {
          color: #bcbcbc;
        }
      }
      .van-icon-search {
        font-size: common.baseSize(15);
        color: #bcbcbc;
      }
    }
  }
  main {
    padding: 0 common.baseSize(18);
  }
  &-history {
    margin-bottom: common.baseSize(10);
    h2 {
      padding: common.baseSize(18) 0 common.baseSize(10);
      font-size: common.baseSize(14);
      font-weight: bold;
    }
    .van-cell {
      padding: common.baseSize(10) 0;
      border-bottom: 1px solid #d7d7d7;
      background-color: #f2f2f2;
      font-size: common.baseSize(12);
      color: #333;
    }
  }
  &-result {
    @extend .search-history;
  }
  &-hot {
     h2 {
      margin-bottom: common.baseSize(12);
      line-height: common.baseSize(40);
      font-size: common.baseSize(14);
      font-weight: bold;
    }
    &_list {
      display: flex;
      flex-wrap: wrap;
      > a {
        flex-basis: 50%;
        margin-bottom: common.baseSize(13);
        font-size: common.baseSize(12);
        color:#333;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>

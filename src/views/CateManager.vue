<template>
  <div class="catemanager">
    <UserHeader title="栏目管理" />
    <!-- 使用事件冒泡 -->
    <main @click="handleClick">
      <div class="catemanager_bar">
        <h4 class="catemanager_title">点击移除以下频道</h4>
        <VanGrid border>
          <VanGridItem v-for="activeCategory in activeCategories" :key="activeCategory.id">
            <van-button class="catemanager_cate-btn remove-cate" color="#f2f2f2">{{ activeCategory.name }}</van-button>
          </VanGridItem>
        </VanGrid>
      </div>
      <div class="catemanager_bar">
        <h4 class="catemanager_title">点击添加以下频道</h4>
        <VanGrid border>
          <VanGridItem v-for="unusedCategory in unusedCategories" :key="unusedCategory.id">
            <van-button class="catemanager_cate-btn add-cate" color="#f2f2f2">{{ unusedCategory.name }}</van-button>
          </VanGridItem>
        </VanGrid>
      </div>
    </main>
  </div>
</template>

<script>
import UserHeader from '@/components/UserHeader.vue'
import { Grid as VanGrid, GridItem as VanGridItem } from 'vant'

export default {
  name: 'CateManager',
  components: {
    VanGrid,
    VanGridItem,
    UserHeader
  },
  data () {
    return {
      activeCategories: [],
      unusedCategories: []
    }
  },
  async mounted () {
    let categories = JSON.parse(localStorage.getItem('heimatoutiao_categories'))

    if (categories) {
      this.activeCategories = categories.activeCategories
      this.unusedCategories = categories.unusedCategories
      return
    }

    // 没有本地数据才发请求
    const [err, res] = await this.$api.getCategory()

    if (err) {
      return this.$toast.fail('获取栏目数据出错')
    }

    let categoriesData = res.data.data
    // 直接去掉 `关注` 和 `头条两个栏目`
    categoriesData = categoriesData.filter(({ name, id }) => (
      id !== 0 && id !== 999 && name !== '关注' && name !== '头条'
    ))

    this.activeCategories = categoriesData
    // 初始化本地数据
    categories = {
      activeCategories: categoriesData,
      unusedCategories: []
    }

    // 将数据存到本地
    localStorage.setItem('heimatoutiao_categories', JSON.stringify(categories))
  },
  methods: {
    handleClick (e) {
      if (e.target.classList.contains('remove-cate')) {
        this.removeCategory()
      } else if (e.target.classList.contains('add-cate')) {
        this.addCategory()
      }
    },
    removeCategory () {
      console.log('remove')
    },
    addCategory () {
      console.log('add')
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/common.scss";

.catemanager {
  main {
    padding: 0 common.baseSize(18) 0;
    ::v-deep {
      .van-grid-item {
        $midPadding: common.baseSize(4);
        $bdPadding: $midPadding * 2;
        height: common.baseSize(40);
        padding: 0 $midPadding 0;
        margin-bottom: common.baseSize(10);

        &:nth-child(4n), &:nth-child(4n + 1) {
          padding: 0;
        }
        &:nth-child(4n + 1) {
          padding-right: $bdPadding;
        }
        &:nth-child(4n) {
          padding-left: $bdPadding;
        }
        &__content {
          padding: 0;
        }
      }
    }
  }
  &_bar {
    padding-top: common.baseSize(10);
    margin-bottom: common.baseSize(15);
  }
  &_title {
    margin-bottom: common.baseSize(15);
    font-size: common.baseSize(12);
    color: #989898;
  }
  &_cate-btn {
    width: 100%;
    height: 100%;
    padding: 0;
    border: 1px solid #dedede !important;
    font-size: common.baseSize(14);
    color: #343335 !important;
  }
}
</style>

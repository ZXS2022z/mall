<script setup>
import { useCategoryStore } from '@/stores'

const categoryStore = useCategoryStore()
</script>
<template>
  <div class="home-category">
    <ul>
      <li v-for="item in categoryStore.categoryList" :key="item.id">
        <RouterLink to="/"> {{ item.name }} </RouterLink>
        <RouterLink to="/" v-for="i in item.children.slice(0, 2)" :key="i.id">
          {{ i.name }}
        </RouterLink>
        <div class="home-category-right">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <RouterLink :to="`/detail/${i.id}`">
                <img :src="i.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis2">
                    {{ i.name }}
                  </p>
                  <p class="desc ellipsis">{{ i.desc }}</p>
                  <p class="price"><i>¥</i>{{ i.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="less">
.home-category {
  height: 500px;
  width: 250px;
  position: relative;
  z-index: 99;
  background: rgba(0, 0, 0, 0.7);

  li {
    width: 250px;
    padding-left: 40px;
    height: 55px;
    line-height: 55px;
    &:hover {
      background: #27ba9b;
      .home-category-right {
        display: block;
      }
    }

    a {
      margin-right: 4px;
      color: #fff;

      &:nth-child(n + 2) {
        font-size: 14px;
      }
    }

    .home-category-right {
      width: 990px;
      height: 500px;
      background: rgba(255, 255, 255, 0.8);
      position: absolute;
      top: 0px;
      left: 250px;
      padding: 0 15px;
      display: none;

      h4 {
        font-size: 20px;
        font-weight: normal;
        line-height: 80px;

        small {
          font-size: 16px;
          color: #666;
        }
      }

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 310px;
          height: 120px;
          margin-right: 15px;
          margin-bottom: 15px;
          border: 1px solid #eee;
          border-radius: 4px;
          background: #fff;
          &:nth-child(3n) {
            margin-right: 0;
          }

          a {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            padding: 10px;
            // color: #000;
            &:hover {
              background: #e3f9f4;
            }

            img {
              width: 95px;
              height: 95px;
            }

            .info {
              padding-left: 10px;
              line-height: 24px;
              overflow: hidden;

              .name {
                font-size: 16px;
                color: #666;
              }

              .desc {
                color: #999;
              }

              .price {
                font-size: 22px;
                color: #cf4444;
                i {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

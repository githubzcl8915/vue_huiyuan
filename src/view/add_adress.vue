<template>
    <div class="add-adress">
        <!-- 头部导航 -->
        <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="$router.back()">
        <template right>
            <van-icon name="search" size="18" />
        </template>
        </van-nav-bar>

        <!-- 填写地址 -->
        <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
import { Toast } from 'vant';
import areaList from '../area.js'
export default {
    data () {
        return {
            areaList,
            searchResult: [],
            huiyuan_area_info:[],
            huiyuan_area_info_default:[],
            gethuiyuan_area:function(){
                var huiyuan_area_list = [];
                huiyuan_area_list = JSON.parse(localStorage.getItem('huiyuan_area') || '[]')
                return huiyuan_area_list;
            }(),
            gethuiyuan_area_default:function(){
                var huiyuan_area_default_list = [];
                huiyuan_area_default_list = JSON.parse(localStorage.getItem('huiyuan_area_default') || '[]')
                return huiyuan_area_default_list;
            }(),
        }
    },
    methods: {
        onSave(e) {
            Toast('添加成功');
            // console.log(e)
            // this.huiyuan_area_info = this.gethuiyuan_area;
            // this.huiyuan_area_info.map((item) =>{
            //     if((e.isDefault == true) && (item.isDefault == true)){
            //         console.log('之前设置了默认地址')
            //         item.isDefault = false;
            //         return item;
            //     }

            // })
            // this.huiyuan_area_info.push(e);

            // localStorage.setItem('huiyuan_area',JSON.stringify(this.huiyuan_area_info));
            if(e.isDefault == true){
                // this.huiyuan_area_info.push(this.huiyuan_area_info_default[0]);
                this.huiyuan_area_info_default[0] = e;
                localStorage.setItem('huiyuan_area_default',JSON.stringify(this.huiyuan_area_info_default));
            }else{
                this.huiyuan_area_info = this.gethuiyuan_area;
                var obj = {...e} ;//对象深拷贝，避免后面添加的(e)对象传址传递影响前面的数据
                this.huiyuan_area_info.push(obj);
                console.log(this.gethuiyuan_area,e);
                localStorage.setItem('huiyuan_area',JSON.stringify(this.huiyuan_area_info));
            }

        },
        onDelete() {
            Toast('delete');
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
                {
                    name: '黄龙万科中心',
                    address: '杭州市西湖区',
                },
                ];
            } else {
                this.searchResult = [];
            }
        },
    }
}
</script>

<style lang="scss">
.add-adress{
    padding: 46px 0;
    background-color: #fff;
}

</style>
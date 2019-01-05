<template>
<div class="navs">
    <mt-navbar v-model="selected" >
        <mt-tab-item 
            :key="item.name" 
            v-for="(item) in navBar" 
            :id="item.name"
            @click.native="gotoPage(item.name)"
            class = "resize"
            >
            {{item.title}}
        </mt-tab-item>
    </mt-navbar>
</div>    
</template>
<script>
import {navBar} from '@/router/nav.js';
export default {
    data(){
        return{
            navBar:navBar,
            selected:''
        }
    },
    watch:{
        '$route':{
            handler(){
                this.selected = this.$route.name;
            },
            immediate:true//true代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法，
        }
    },
    methods:{
        gotoPage(n){
            this.$router.push({name:n});
            console.log(this.$route.name);
        }
    }
}
</script>
<style>

.resize .mint-tab-item-label{
    font-size:.35rem;

}

</style>
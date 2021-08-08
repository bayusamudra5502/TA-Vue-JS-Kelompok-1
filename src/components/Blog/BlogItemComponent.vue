<template>
    <el-card class="box-card" shadow="hover" style="margin-bottom: 10px">
        <div>
            <h3>{{ blog.title }}</h3>
            <p>{{ blog.description.substring(0, 15) }}</p>
            <img class="image" :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'" height="200px" style="float: right"/>
        </div>
    </el-card>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
    data : () => ({
         apiDomain : 'http://demo-api-vue.sanbercloud.com' ,
    }),
    props : ['blog']
}
</script>
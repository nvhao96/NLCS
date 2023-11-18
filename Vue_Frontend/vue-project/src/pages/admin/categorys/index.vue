<template>
    <div class="container">
        <h3>Quản lý danh mục</h3>

        <button @click="addCategory" class="btn btn-success">Thêm danh mục</button>

        <div class="row category">

            <table class="table table-hover table-bordered text-center">
                <thead class="dark">
                    <tr>
                        <th></th>
                        <th>Danh Mục</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(category, index) in categorys" :key="category.id">
                        {{ console.log(category) }}
                        <th>{{ index + 1 }}</th>
                        <td>{{ category.categoryname }} </td>
                        <td>
                            <router-link :to="{ name: 'admin-detailcategorys', params: { id: category._id } }"><i
                                    class="bi bi-pencil-square"></i></router-link>
                        </td>
                    </tr>




                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import CategoryService from '@/services/category.service';

export default {
    name: 'admin-categorys',

    data() {
        return {
            categorys: [],
        }
    },

    mounted() {
        this.fetchgetNameCategorys()
    },

    methods: {
        addCategory() {
            this.$router.push('/admin/addcategorys');
        },

        async fetchgetNameCategorys() {
            try {
                this.categorys = await CategoryService.getNameCategorys();
            } catch (error) {
                console.log(error);
            }
        },

    },


}
</script>

<style scoped>
.category {
    margin: 30px 0;
}

h3 {
    text-align: center;
    font-weight: bold;
    margin-top: 30px;
}
</style>
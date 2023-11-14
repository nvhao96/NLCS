
<template>
    <AdminHeader></AdminHeader>

    <router-view></router-view>
</template>

<script>
import AdminHeader from '@/components/AdminHeader.vue';

export default {
    name: 'Admin',
    components: {
        AdminHeader,
    }

};
</script>

<style></style>
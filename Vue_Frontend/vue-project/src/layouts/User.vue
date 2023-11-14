<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';

export default {
    name: 'User',
    components: {
        TheHeader,
        TheFooter,
    },
};

</script>

<template>
    <TheHeader></TheHeader>
    <router-view></router-view>
    <TheFooter></TheFooter>
</template>



<style></style>
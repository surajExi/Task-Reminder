<template>
    <div class="container">
        <div class="row vertical-centre justify-content-center mt-50">
            <div class="col-md-6 mx-auto">
                <CreateTask></CreateTask>
                <ListTask></ListTask>
            </div>
        </div>
    </div>
</template>

<script>
    import CreateTask from "./vue-components/CreateTask.vue";
    import ListTask from "./vue-components/ListTask.vue";
    export default {
        name: "app",
        components: { CreateTask,ListTask }
    };
</script>

<style lang="scss">
    @import "node_modules/bootstrap/scss/bootstrap";
    @import "node_modules/bootstrap-vue/src/index.scss";

    .vertical-centre {
        min-height: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
    }

    .todo__row {
        width: 400px;
    }
</style>
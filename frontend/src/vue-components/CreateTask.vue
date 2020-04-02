<style lang="scss" scoped>
    .underline {
        text-decoration: underline;
    }

    .heading {
        color: darkblue;
    }

    .outline {
        border: 1px solid #0094ff;
        padding: 25px;
        border-radius: 3px;
        background-color: #a4a4a4;
    }
</style>


<template>
    <div class="col align-self-center outline">
        <div class="heading">
            <h3 class="pb-5 text-left">Create Tasks</h3>
        </div>
        <form class="form" @submit.prevent>
            <div class="form-group todo__row">
                <input type="text" class="form-control" placeholder="Add your task title" v-model="task" />
            </div>
            <div class="form-group todo__row">
                <input type="text"
                       class="form-control"
                       @keypress=""
                       placeholder="Add your tasks diligently!"
                       v-model="taskdetails"
                       @keyup.enter="addTask($event)" />
            </div>
        </form>
    </div>
</template>



<script>
    import bus from "../bus";

    export default {
        ret_data() {
            return {
                task: "",
                taskdetails: ""
            };
        },
        methods: {
            addTask(event) {
                console.log("Adding task");
                if (event) event.preventDefault();
                var task = {
                    task: this.task,
                    taskdetails: this.taskdetails,
                    taskstatus: 1
                };
                this.$http
                    .post("/api/tasks/createtask", task)
                    .then(response => {
                        console.log(response);
                        this.clearTask();
                        this.refreshTask();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            clearTask() {
                this.task = "";
                this.taskdetails = "";
            },

            refreshTask() {
                bus.$emit("refreshTask");
            }
        }
    }

</script>
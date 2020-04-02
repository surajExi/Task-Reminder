<style lang="scss" scoped>
    .todo__done {
        text-decoration: line-through !important;

    }

    .no_border_left_right {
        border-left: 0px;
        border-right: 0px;
    }

    .flat_form {
        border-radius: 0px;
    }

    .mrb-10 {
        margin-bottom: 10px;
    }

    .addon-left {
        background-color: none !important;
        border-left: 0px !important;
        cursor: pointer !important;
    }

    .addon-right {
        background-color: none !important;
        border-right: 0px !important;
    }
</style>
<template>
    <div v-bind:show="tasks.length>0" class="col align-self-center">
        <div class="form-row align-items-center" v-for="tsk in tasks">

            <div class="col-auto my-1" style="display:inline-flex;">
                <input class="form-control col-md-3" type="text" disabled  v-model="tsk.task" value="tsk.task"/>
                <div class="input-group mb-3 todo__row">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <input type="checkbox"
                                   v-model="tsk.iscompleted"
                                   :checked="tsk.iscompleted"
                                   :value="tsk.iscompleted"
                                   v-on:change="updateTaskToComplete(tsk)"
                                   title="Mark as done?" />
                        </span>
                    </div>

                    <input type="text"
                           class="form-control"
                           :class="tsk.iscompleted?'todo__done':''"
                           :disabled="tsk.iscompleted"
                           v-model="tsk.taskdetails"
                           @keyup.enter="updateTask(tsk)" />
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="input-group-addon addon-left"
                                  title="Delete task?"
                                  v-on:click="deleteTask(tsk.id)">
                                X
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="alert alert-primary todo__row"
             v-show="tasks.length==0 && doneLoading">Add some tasks..</div>
    </div>
</template>


<script>
    import bus from "./../bus.js";
    export default {
        data() {
            return {
                tasks: [],
                doneLoading: true
            };
        },
        created: function () {
            this.fetchTasks();
            this.listenToEvents();
        },
        watch: {
            $route: function () {
                let self = this;
                self.doneLoading = false;
                self.fetchData().then(function () {
                    self.doneLoading = true;
                });
            }
        },
        methods: {
            fetchTasks() {
                this.$http.get("/api/tasks/taskList").then(response => {
                    this.tasks = response.data;
                });
            },
            updateTaskToComplete(task) {
                let id = task.id;
                this.$http
                    .put('/api/tasks/updateTaskToComplete/' + id, task)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            updateTask(task) {
                console.log("Gala lo");
                let id = task.id;
                this.$http
                    .put('/api/tasks/updateTask/' + id, task)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            deleteTask(id) {
                this.$http.delete('/api/tasks/deleteTask/' + id).then(response => {
                    this.fetchTasks();
                });
            },
            listenToEvents() {
                bus.$on("refreshTask", $event => {
                    this.fetchTasks(); //update todo
                });
            }
        }
    };
</script>
<script>
import Task from './Task.vue'
import { mapActions, mapState } from 'pinia';
import ToDoStore from '../stores/task'



export default {
    name: 'Dashboard',
    data() {
        return {
            toDoList: [],
            inProgressList: [],
            doneTasks: [],
            username: '',
            changing: false,

        }
    }, components: {
        Task,
    },
    computed: {
        ...mapState(ToDoStore, ['taskList','user'])
    },methods: {
            async List() {
                this.changing = true;
                this.toDoList = [];
                this.inProgressList = [];
                this.doneTasks = [];
                await this.getTaskList();
                for(let task of this.taskList){
                    
                    if(task.stage == "do"){
                        this.toDoList.push(task);
                    }else if(task.stage == "progress"){
                        this.inProgressList.push(task);
                    }else{
                        this.doneTasks.push(task);
                    }
                }
                this.changing = false;
            },
            goto(task) {
                this.$router.push(`/ironhack/${localStorage.username}/dashboard/edit-task/${task.id}`);
            },
            ...mapActions(ToDoStore, ['getTaskList','fetchAll'])
    },created() {
            this.List();
            this.username = localStorage.username;

            this.$watch(
      () => this.$route.params,
      (newParams, oldParams) => {
            if(this.$route.path == "/ironhack/"+localStorage.username+"/dashboard/task-created" || this.$route.path == "/ironhack/"+localStorage.username+"/dashboard/task-edited" || this.$route.path == "/ironhack/"+localStorage.username+"/dashboard/task-deleted"){
                this.List();
            }
            

      }
    );
    }
}
</script>

<template>
    <div id="dashboardDiv">
        <div id="headerDasboardDiv">
            <h1>Hello, {{ username }}</h1>
        </div>
        <div id="toDoDiv">
            <div class="header">
                <h3>To Do</h3>
            </div>
            <div class="list">

                <Task v-if="changing" :task="{title: '', description: ''}"></Task>
                <Task @click="goto(task)" v-for="task in toDoList" :task = task></Task>
            </div>
            
        </div>
        <div id="inProgressDiv">
            <div class="header">
                <h3>In Progress</h3>
            </div>
            <div class="list">
                <Task v-if="changing" :task="{title: '', description: ''}"></Task>
                <Task @click="goto(task)" v-for="task in inProgressList" :task = task></Task>
            </div>
            
        </div>
        <div id="doneDiv">
            <div class="header">
                <h3>Done</h3>
            </div>
            <div class="list">
                <Task v-if="changing" :task="{title: '', description: ''}"></Task>
                <Task @click="goto(task)" v-for="task in doneTasks" :task = task></Task>
            </div>
            
        </div>
        <div id="taskPanelDiv">
            <div id="cover">
                <router-view></router-view>
            </div>
    </div>
    </div>

</template>



<style scoped>

#dashboardDiv {
    height: 100%;
    display: grid;
    padding-bottom: 50px;
}

.list {
    height: 100%;
}


#headerDasboardDiv {
    grid-row: 1;
    grid-column: 1/15;

}
#toDoDiv {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.header{
    text-align: center;
}

#inProgressDiv {
    display: flex;
    flex-direction: column;
}

#toDoDiv {
    display: flex;
    flex-direction: column;
}

#doneDiv {
    display: flex;
    flex-direction: column;
}

#taskPanelDiv {
        grid-column: 8;
        grid-row: 1 / 4;
        padding: 10px;
        min-width: 35rem;

        display: flex;
        justify-content: center;
        margin-top: 10rem;

        
    }
#cover {
        position: fixed;
        background: #FFFFFF;
        box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.1), 0px 8px 53px rgba(0, 120, 240, 0.25);
        border-radius: 10px;
        padding: 50px;
        min-width: 32rem;
        min-height: 40rem;
}
</style>
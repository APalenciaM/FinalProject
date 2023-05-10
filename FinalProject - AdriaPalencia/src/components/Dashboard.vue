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
            doneTasks: []

        }
    }, components: {
        Task,
    },
    computed: {
        ...mapState(ToDoStore, ['taskList'])
    },methods: {
            async ToDoList() {
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

            },
            ...mapActions(ToDoStore, ['getTaskList','fetchAll'])
    },created() {
            this.ToDoList(); 
    }
}
</script>

<template>
    <div id="dashboardDiv">
        <div id="toDoDiv">
            <div id="toDoHeader">
                <h3>To Do</h3>
            </div>
            <Task v-for="task in toDoList"></Task>
            
        </div>
        <div id="inProgressDiv">
            <div id="inProgressHeader">
                <h3>In Progress</h3>
            </div>
            <Task v-for="task in inProgressList"></Task>
        </div>
        <div id="doneDiv">
            <div id="doneHeader">
                <h3>Done</h3>
            </div>
            <Task v-for="task in doneTasks"></Task>
        </div>
    </div>
</template>



<style scoped>

#dashboardDiv {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3,1fr);
}

#toDoDiv {
    height: 100%;
    display: flex;
    flex-direction: column;
}

#toDoHeader {
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
</style>
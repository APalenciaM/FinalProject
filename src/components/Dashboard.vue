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
            filtredBy: [],

        }
    }, components: {
        Task,
    },
    computed: {
        ...mapState(ToDoStore, ['taskList','user','AllUsers'])
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
            async initUsers() {
                await this.getAllUsers();
            },
            goto(task) {
                this.$router.push(`/ironhack/${localStorage.username}/dashboard/edit-task/${task.id}`);
            },
            goToCreatTask() {
                this.$router.push(`/ironhack/${localStorage.username}/dashboard`);
            },
            setFilter(filter) {
                
                if(this.filtredBy.includes(filter)){
                    const spansS = document.querySelectorAll('.spansS');
                    for(let span of spansS){
                        if(span.innerText == filter){
                            span.className = "spans";
                    };
                    }
                    const index = this.filtredBy.indexOf(filter);
                    
                    this.filtredBy.splice(index, 1);
                } else {
                    
                    this.filtredBy.push(filter);
                    const spans = document.querySelectorAll('.spans');

                    for(let span of spans){
                        if(span.innerText == filter){
                            span.className = "spansS " + span.className;
                        };
                    }
                }

                if(this.filtredBy.length==0) {
                    this.toDoList = [];
                    this.inProgressList = [];
                    this.doneTasks = [];
                    for(let task of this.taskList){
                    
                    if(task.stage == "do"){
                        this.toDoList.push(task);
                    }else if(task.stage == "progress"){
                        this.inProgressList.push(task);
                    }else{
                        this.doneTasks.push(task);
                    }
                }
                    return;
                }
                

                this.toDoList = [];
                this.inProgressList = [];
                this.doneTasks = [];
                
                for(let task of this.taskList){

                    for(let _filter of this.filtredBy){
                        if (task.assignee == _filter){

                            if(task.stage == "do" ){

                                this.toDoList.push(task);

                            }else if(task.stage == "progress"){

                                this.inProgressList.push(task);

                            }else{

                                this.doneTasks.push(task);
                            }
                        }
                    }
                }



            },
            ...mapActions(ToDoStore, ['getTaskList','fetchAll','getAllUsers'])
    },created() {

            if(!localStorage.username){
                
            this.$router.push(`/unauthorized`);
            }

            this.initUsers();    
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
            <button @click="goToCreatTask()" id="createTaskButton">+ New Task</button> 
            <div id="spansDiv">
                <span id="filterspan">FilterBy:</span>
                <span @click="setFilter('Unassigned')" class="spans" >Unassigned</span>
                <span @click="setFilter(user.name)"  class="spans" v-for="user in AllUsers">{{ user.name }}</span>
            </div>

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
#borderdiv{
    width: 100%;
    grid-column: 1/6;
    grid-row: 1;
    border-bottom: 1px solid black;
}
#dashboardDiv {
    height: 100%;
    display: grid;
    padding-bottom: 50px;

    grid-template-rows: minmax(100px, 150px);
}

.list {
    height: 100%;
    min-width: 21rem;
}


#headerDasboardDiv {
    grid-row: 1;
    grid-column: 1/15;
    display: flex;
    align-items: end;
    flex-direction: row;
    padding-bottom: 25px;
    margin-bottom: 15px;
    ;
}



#toDoDiv {
    height: 100%;
    display: flex;
    flex-direction: column;
    grid-row: 2;
}

.header{
    text-align: center;
}

#inProgressDiv {
    display: flex;
    flex-direction: column;
    grid-row: 2;
}

#doneDiv {
    display: flex;
    flex-direction: column;
    grid-row: 2;
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

#createTaskButton {
    box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #4187d6;
    opacity: 0.7;
    color: white;
    font-weight: bolder;
    margin-right: 50px;
}
span {
    font-size: 22px;
    color: #3f4244;

    font-weight: 400;

    margin: 0 2.5px;
}

.spans {
        background-color: white;
        border-radius: 30px;
        padding: 0px 7px;
        border: 1px solid black;
        color: #6c757d;
        font-weight: 500;
}

.spansS {
        background-color: #135caf;
        border-radius: 30px;
        padding: 0px 7px;
        border: 1px solid black;
        color: white;
        font-weight: 500;
}
</style>
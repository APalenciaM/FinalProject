<script>
import { mapActions, mapState } from 'pinia';
import ToDoStore from '../stores/task'
export default {
    name: 'Dashboard',
    data() {
        return {
            stage: 'do',
            description: '',
            title: '',
            color: '',
            selected: ''
        }
    }, components: {
    },
    computed: {
        ...mapState(ToDoStore, ['taskList','user', 'task','AllUsers']),
    },methods: {
            async Init() {
                await this.getTaskbyId(this.$route.params.id);
                this.description = this.task[0].description;
                this.title = this.task[0].title;
                this.color = this.task[0].color;
                const descriptiondiv = document.getElementById("descriptionTextarea");
                
                this.selected = this.color
                document.getElementById("selectColor").value = this.selected;
                
                descriptiondiv.className = this.color
                
                this.assigned = this.task[0].assignee;
                
                document.getElementById("titleTaskInput").value = this.title;
                this.stage = this.task[0].stage;
                this.updateColor();

            },
            async editTask() {

                const title = document.getElementById('titleTaskInput').value;
                const description = document.getElementById('descriptionTextarea').value;
                await this.updateTask(this.$route.params.id,title,description,this.stage,this.selected,this.assigned);
                this.$router.push(`/ironhack/${localStorage.username}/dashboard/task-edited`);
            },
            async deleteTaskbyId() {
                await this.deleteTask(this.$route.params.id);
                this.$router.push(`/ironhack/${localStorage.username}/dashboard/task-deleted`);
            },
            updateColor () {
                document.getElementById('selectColor').className = this.selected;
                document.getElementById('descriptionTextarea').className = this.selected
            },  
            ...mapActions(ToDoStore, ['getTaskList','fetchAll','getTaskbyId','updateTask','deleteTask','getAllUsers']),
    },created() {
        this.Init();
        
        this.$watch(
      () => this.$route.params,
      (newParams, oldParams) => {

        if(this.$route.path != "/ironhack/"+localStorage.username+"/dashboard/task-created"){
            this.Init();
        }
      }
    );
    }

}

</script>
<template>
    <div id="newTaskDiv">
        <div style="text-align: center;">
            <h2>Edit task</h2>
        </div>
        <div id="TitleTaskDiv">
            <strong class="me-auto">Title:</strong>
            <input id="titleTaskInput" />
        </div>
        <div id="descriptionTaskDiv">
            <strong class="me-auto">Description:</strong>
            <textarea id="descriptionTextarea">{{ description }}</textarea>
        </div>
        <div id="stageDiv">
            <strong class="me-auto">Stage:</strong>

            <select id="selectStage"  class="custom-select" v-model="stage">
                <option value="do">To Do</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
            </select>
        </div>
        <div id="colorTaskDiv">
            <strong class="me-auto">Color:</strong>
            <select id="selectColor" class="grey" @change="updateColor()" v-model="selected">
                
                <option class="grey" value="grey"></option>
                <option class="green" value="green"></option>
                <option class="red" value="red"></option>
                <option class="purple" value="purple"></option>
                <option class="yellow" value="yellow"></option>
            </select>
        </div>
        <div id="assigneUser">
            <strong id="assigneetitle" class="me-auto">Assigne:</strong>
            <select id="selectAssignee"  class="custom-select" v-model="assigned">
                <option>Unassigned</option>
                <option v-for="user in AllUsers">{{ user.username }}</option>
            </select>
        </div>
        <button id="createTaskButton" @click="editTask()">Edit</button>
        <button id="createTaskButton" @click="deleteTaskbyId()">Delete</button>
    </div>
</template>

<style scoped>
h2 {
    color: #0070cc;
}

.grey {
    background-color: rgba(224, 223, 223, 0.85);
}

.green{
    background-color: rgb(233, 252, 237);
}

.red {
    background-color: rgb(252, 183, 175);
}

.purple {
    background-color: rgb(176, 194, 242);
    
}

.yellow {
    background-color: rgb(255, 202, 153);
}

select {
    min-width: 5rem;
    min-height: 2rem;
    border-radius: 16px;
    outline: none;
    appearance: none;
    outline: none;
}

option {
    zoom: 1.5;
}

input:focus, select:focus, select, input.form-control:focus {

outline:none !important;

outline-width: 0 !important;

box-shadow: none;

-moz-box-shadow: none;

-webkit-box-shadow: none;

}

#createTaskButton {
    box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    background-color: #4187d6;
    color: white;
    font-weight: bolder;
}



#newTaskDiv {
    display: flex;
    flex-direction: column;
}

#TitleTaskDiv {
    color: #6c757d;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

#assigneUser {
    color: #6c757d;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
}

#titleTaskInput {
    background: rgb(226, 232, 233);;
    border-radius: 4px 4px 0px 0px;
    border: 0;
    outline: none;
    padding: 2.5px 10px;

    border-radius: 6px;
}

#descriptionTaskDiv {
    color: #6c757d;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}

#stageDiv {
    color: #6c757d;
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    align-items: center;
}

#colorTaskDiv {
    color: #6c757d;
    display: flex;
    flex-direction: row;
    align-items: center;
    
    margin-bottom: 25px;
}

input {
    outline: none;
}

#descriptionTextarea {
    border-radius: 4px 4px 0px 0px;
    border: 0;
    outline: none;
    padding: 10px;
    resize: none;
    height: 7rem;
    overflow-y: scroll;
    scrollbar-width: none; 
    border-radius: 6px;
        
    }

    #descriptionTextarea::-webkit-scrollbar {
        width: 0;
    }

    #selectColor {
        margin-left: 20px;
    }

    #assigneetitle {
        margin-bottom: 5px;
    }

    #selectStage {
        margin-left: 100px;
    }
</style>
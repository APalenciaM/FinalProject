<script>
import { mapActions, mapState } from 'pinia';
import ToDoStore from '../stores/task'
export default {
    name: 'Dashboard',
    data() {
        return {
            selected: 'grey',
            assigned: 'Unassigned',
        }
    }, components: {
    },
    computed: {
        ...mapState(ToDoStore, ['taskList','user','AllUsers'])
    },methods: {
            async createTask() {
                let title = document.querySelector('#titleTaskInput').value;
                let description = document.querySelector('#descriptionTextarea').value;

                if(title == "") title = "Task";
                if(description == "") description = "Description";
                await this.newTask(title,description,this.selected,this.assigned);

                this.$router.push(`/ironhack/${localStorage.username}/dashboard/task-created`);

            },
            async init() {
                await this.getAllUsers();

            },
            updateColor () {
                document.getElementById('selectColor').className = this.selected;
                document.getElementById('descriptionTextarea').className = this.selected
            },  
            ...mapActions(ToDoStore, ['getTaskList','fetchAll','newTask','getAllUsers'])
    },created() {
        this.init();
    }

}

</script>

<template>
    <div id="newTaskDiv">
        <div style="text-align: center;">
            <h2>Create a new task</h2>
        </div>
        <div id="TitleTaskDiv">
            <strong class="me-auto">Title:</strong>
            <input id="titleTaskInput" placeholder="Task" />
        </div>
        <div id="descriptionTaskDiv">
            <strong class="me-auto">Description:</strong>
            <textarea id="descriptionTextarea" class="grey" placeholder="Description" ></textarea>
        </div>
        <div>

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
        <button id="createTaskButton" @click="createTask()">Create</button>
    </div>
</template>



<style scoped>

h2 {
    color: #0070cc;
    opacity: 0.7;

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
    opacity: 0.7;
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
    background: rgba(224, 223, 223, 0.85);;
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
</style>
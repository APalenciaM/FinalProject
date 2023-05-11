<template>
    <div id="taskDiv">
        <div class="toast-header" id="headertask">
            <strong class="me-auto">{{ task.title }}</strong>
        </div>
        <div id="taskBody">
            <textarea disabled id="tastkTextArea" cols="30" rows="10">{{task.description}}</textarea>
            <div id="assigneDiv">
                <span id="spans">{{ task.assignee }}</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Task',
    props: [
        'task'
    ],
    data() {
        return {
            color: 'rgba(224, 223, 223, 0.85)',
        }
    },mounted() {
        switch(this.task.color){
            case "red":
                this.color = "#fcb7af";
                break;

            case "purple":
                this.color = "#b0c2f2"
                break;
            
            case "green":
                this.color = "#e9fced"
                break;

            case "yellow":
                this.color = "#ffca99"
                break;

            case "blue":
                this.color = "#b2e2f2"
                break;

            default:
                this.color = "rgba(224, 223, 223, 0.85)";
                break;
        }

    }
}
</script>

<style scoped>
    #taskDiv {
        margin: 10px;
    }

    
    #taskBody {

        padding: 20px;
        background-color: v-bind(color);
        margin-top: -1px;
        border-bottom-right-radius: 30px;
        border-bottom-left-radius: 30px;
        height: 9rem;
    
    }

    #headertask {
        background-color: rgb(209, 215, 216);
        height: 2.4rem;
        border-top-right-radius: 30px;
        border-top-left-radius: 30px;
    }

    #tastkTextArea {
        resize: none;
        overflow: auto;
        border: none;
        background-color: transparent;
        outline: none;
        height: 5rem;
        scrollbar-width: none; 
        
    }

    #tastkTextArea::-webkit-scrollbar {
        width: 0;
    }

    #assigneDiv {
        display: flex;
        justify-content: end;

    }

    #spans {
        background-color: white;
        border-radius: 30px;
        padding: 0px 7px;
        opacity: 0.5;
    }
</style>
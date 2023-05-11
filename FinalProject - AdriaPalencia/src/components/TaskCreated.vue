<script>
export default {
    methods: {
        goToCreateTask() {
            this.$router.push(`/ironhack/${localStorage.username}/dashboard/new-task`);
        }
    }
}

</script>

<template>
    <div id="taskEditedDiv">
        <div>
            <img src="../assets/carpeta.gif" width="300" height="300"/>
        </div>
        <div >
            <h4>Task added correctly, let's to start it.</h4>
        </div>
        <div id="buttonDiv">
            <button id="createTaskButton" @click="goToCreateTask()">Close</button>
        </div>
        
    </div>
</template>



<style scoped>

#buttonDiv{
    margin-top: 20px;
}

img {
    opacity: 0.4;
}

h4 {
    opacity: 0.4;
}

#taskEditedDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    
}

#createTaskButton {
    box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    background-color: #4187d6;
    opacity: 0.7;
    color: white;
    font-weight: bolder;
}
</style>
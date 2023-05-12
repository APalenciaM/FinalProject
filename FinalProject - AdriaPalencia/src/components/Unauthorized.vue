<script>
export default {
    methods: {
        goToCreateTask() {
            localStorage.clear();
            this.$router.push(`/login`);
        }
    }
}

</script>

<template>
    <div id="taskEditedDiv">
        <div>
            <img src="../assets/advertencia.png" width="300" height="300"/>
        </div>
        <div id="textDiv" >
            <h2>It seems that you do not have permission to access here.<br/> Please come with us...</h2>
        </div>
        <div id="buttonDiv">
            <button id="createTaskButton" @click="goToCreateTask()">Go back</button>
        </div>
        
    </div>
</template>



<style scoped>


#textDiv {
    text-align: center;
    letter-spacing: 5px;
    margin-top: 30px;

}

#buttonDiv{
    margin-top: 20px;
}

img {
    opacity: 0.4;
}

h2 {
    opacity: 0.4;
}

#taskEditedDiv {
    height: 100%;
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
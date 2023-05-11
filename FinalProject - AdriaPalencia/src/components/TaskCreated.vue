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
    <div>
        <button id="createTaskButton" @click="goToCreateTask()">Create another task +</button>
    </div>
</template>



<style scoped>
#createTaskButton {
    box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
    border-radius: 16px;
}
</style>
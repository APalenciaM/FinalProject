<script>
import { mapActions, mapState } from 'pinia';
import ToDoStore from './stores/task'

export default {
  name: 'App',
  components: {

  },methods: {

            ...mapActions(ToDoStore, ['getUserByUsername','fetchAll','initAll'])
  },created() {
            if(localStorage.username){
              this.initAll();
                this.$router.push(`/ironhack/${localStorage.username}/dashboard`);
            }
        },
    computed: {
        ...mapState(ToDoStore, ['taskList','user','username'])
    },
}
</script>

<template>
<router-view></router-view>
</template>

<style>
</style>

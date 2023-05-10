<script>
import { supabase } from '../lib/supabaseClient.js'
export default {
    name: 'User',
    data() {
        return {

        }
    },methods: {
        async prueba() {
            const { data } = await supabase.from('prueba').select().eq('id', 2).single();
            console.log(data);
        }
    },created() {
    },
}

</script>

<template>
    <div id="userDiv">
        <div id="userinterface">
        </div>
        <div id="dashboarddiv">
        <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>

#userDiv {
   width: 100vw;
   height: 100vh;

   display: grid;
   grid-template-columns: repeat(15,1fr);
}

#userinterface {
    background-color: #928c99;
}

#dashboarddiv {
    grid-column: 2/8;
}
</style>
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
        }, LogOut() {
            localStorage.clear();
            this.$router.push(`/login`);
        }
    },created() {
    },
}

</script>

<template>
    <div id="userDiv">
        <div id="userinterface">
            <div id="userNavBar">
                <button @click=LogOut()>LogOut</button>
            </div>
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

#userNavBar {
    background-color: #928c99;
    width: 60%;
    height: 100%;
}

#dashboarddiv {
    grid-column: 2/16;
}
</style>
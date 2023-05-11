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
            <div id="userNavBar">
                <img @click=LogOut() src="../assets/logout_FILL0_wght700_GRAD200_opsz48.png"/>
            </div>
        <div id="dashboarddiv">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>

img {
    opacity: 0.7;
}
#userDiv {
   width: 100vw;
   height: 100vh;

   display: grid;
   grid-template-columns: repeat(15,1fr);
   overflow-x: hidden;
}

#userNavBar {
    position: fixed;
    background-color: rgba(0, 120, 240, 0.3);
    width: 5%;
    height: 100%;
    padding-bottom: 20px;
    display: flex;
    align-items: end;
    justify-content: center;
}

#dashboarddiv {
    grid-column: 2/16;
}
</style>
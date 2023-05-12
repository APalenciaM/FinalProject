<script>
import { supabase } from '../lib/supabaseClient.js'
import sha256 from 'crypto-js/sha256';
import { mapActions, mapState } from 'pinia';
import ToDoStore from '../stores/task'

    let myuser;

    export default {
        name: `Login`,
        data() {
            return {
                
            }
        },
        computed: {
            ...mapState(ToDoStore, ['user'])
        },methods: {
            async Login() {
                const username = document.querySelector('#usernameInput').value;
                const passw = document.querySelector('#passwordInput').value;

                await this.getUser(username, passw);

                const user = this.user[0];


                if(typeof this.user[0] === 'undefined'){
                    const toast = document.getElementById('liveToast');
                
                    toast.style.opacity = 1;
                    return;
                }
                if(user.username == username && user.passw == passw){
                    localStorage.username = user.username;
                    this.$router.push(`/ironhack/${username}/dashboard`);
                }
            },
            ...mapActions(ToDoStore, ['getUser','fetchAll','getUserByUsername'])
        }
    }
</script>

<template>
    <div id="loginDiv">
        
        <div id="loginTempleateDiv">
            <div id="loginUserImageDiv">
                <img src="../assets/icons/LoginIcons/UserLogin.svg" alt="userLoginImage">
            </div>
            <div id="loginTextDiv">
                <h1 id="loginTextH1">Login</h1>
            </div>
            <div id="usernameLoginDiv">
                <input id="usernameInput" placeholder="Username"/>
            </div>
            <div id="passwordLoginDiv">
                <input type="password" id="passwordInput" placeholder="Password"/>
            </div>
            <div id="loginButtonDiv">
                <button id="loginButton" @click="$event => Login()">Login</button>
            </div>
            <div id="forgetPasswDiv">
                <router-link to="/register"><a>Create an account -></a></router-link>
            </div>
        </div>
        
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
            <strong class="me-auto">Login error</strong>
            </div>
            <div id="modal_msg" class="toast-body">
                Username or password incorrects
            </div>
        </div>
    </div>
</template>

<style>
    #liveToast {
        max-width: none;
        margin-top: 30px;
    }

    #modal_msg {
        color: rgb(241, 104, 49);
    }
    #loginDiv {
        display: grid;
        justify-content: center;
        align-content: center;

        height: 100%;
        width: 100%;
    }

    #loginTempleateDiv {
        background: #FFFFFF;
        box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.1), 0px 8px 53px rgba(0, 120, 240, 0.25);
        border-radius: 10px;

        padding: 10px;
        min-width: 25rem;

        display: flex;
        align-items: center;
        flex-direction: column;
    }
    
    #loginUserImageDiv {
        display: flex;
        justify-content: center;
        margin-top: -60px;
        margin-bottom: 20px;
    }

    #loginTextDiv {
        margin-bottom: 30px;
    }

    #loginTextH1 {
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 31px;

        display: flex;
        align-items: flex-end;

        color: rgba(0, 120, 240, 0.5);
    }

    input {
        min-width: 10rem;
        outline: none;
    }

    button {
        min-width: 10rem;
        min-height: 2rem;
    }

    #usernameLoginDiv {
        display: flex;
        flex-direction: column;
    }

    #usernameInput {
        border: none;
        border-bottom: 1px solid black;
        margin-bottom: 20px;
    }

    #passwordLoginDiv {
        display: flex;
        flex-direction: column;
    }

    #passwordInput {
        border: none;
        border-bottom: 1px solid black;
    }

    #loginButton {
        background: rgba(0, 120, 240, 0.1);
        border: 1px solid #0078F0;
        border-radius: 10px;

        color: #0078F0;

        margin-top: 20px;
    }

    #forgetPasswDiv {
        width: 100%;
        margin-top: 20px;
    }

    #forgetPasswDiv a{
        color: rgba(0, 120, 240, 0.5);
        text-decoration: none;
        
    }
</style>
<script>
import { supabase } from '../lib/supabaseClient.js'
import sha256 from 'crypto-js/sha256';
import { mapActions, mapState } from 'pinia';
import ToDoStore from '../stores/task'

    export default {
        name: `Register`,
        data() {
            return {

            }
        },
        computed: {
            ...mapState(ToDoStore, ['user'])
        },
        methods: {
            async Register() {
                const username = document.querySelector('#usernameInput').value;
                const name = document.querySelector("#nameInput").value;
                const passw = document.querySelector('#passwordInput').value;
                const passwrepited = document.querySelector('#passwordRepitInput').value ;      
                const toastE = document.getElementById('liveToastErr');
                const toast = document.getElementById('liveToast');
                await this.getUser(username, passw);
                if(typeof this.user[0] === 'undefined'){
                    this.register(username, name, passw);

                    toast.style.opacity = 1;
                    toastE.style.opacity = 0;
                    return;
                }
                
                toast.style.opacity = 0;
                toastE.style.opacity = 1;
            },

        ...mapActions(ToDoStore, ['getUser','register'])
        },
    }
</script>

<template>
    <div id="registerDiv">
        <div id="registerTempleateDiv">
            <div id="registerUserImageDiv">
                <img src="../assets/icons/LoginIcons/UserLogin.svg" alt="userRegisterImage">
            </div>
            <div id="registerTextDiv">
                <h1 id="registerTextH1">Register</h1>
            </div>
            <div id="nameregisterDiv">
                <input id="nameInput" placeholder="Name"/>
            </div>
            <div id="usernameregisterDiv">
                <input id="usernameInput" placeholder="Username"/>
            </div>
            <div id="passwordregisterDiv">
                <input id="passwordInput" placeholder="Password"/>
            </div>
            <div id="passwordRepitregisterDiv">
                <input id="passwordRepitInput" placeholder="Repit password"/>
            </div>
            <div>
                <button id="registerButton" @click="Register()">Register</button>
            </div>
            <div id="forgetPasswDiv">
                <router-link to="/login"><a>Sign Up -></a></router-link>
            </div>
            
        </div>
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
            <strong class="me-auto">Registery completed</strong>
            </div>
        </div>
        <div id="liveToastErr" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
            <strong class="me-auto">Register error</strong>
            </div>
            <div id="modal_msg" class="toast-body">
                Some value is incorrect
            </div>
        </div>
    </div>
</template>

<style>

    #registerDiv {
        display: grid;
        justify-content: center;
        align-content: center;

        height: 100%;
        width: 100%;
    }

    #registerTempleateDiv {
        background: #FFFFFF;
        box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.1), 0px 8px 53px rgba(0, 120, 240, 0.25);
        border-radius: 10px;

        padding: 10px;
        min-width: 25rem;

        display: flex;
        align-items: center;
        flex-direction: column;
    }
    
    #registerUserImageDiv {
        display: flex;
        justify-content: center;
        margin-top: -60px;
        margin-bottom: 20px;
    }

    #registerTextDiv {
        margin-bottom: 30px;
    }

    #registerTextH1 {
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

    #nameregisterDiv {
        display: flex;
        flex-direction: column;
    }

    #nameInput {
        border: none;
        border-bottom: 1px solid black;
        margin-bottom: 10px;
    }
    #usernameInput {
        border: none;
        border-bottom: 1px solid black;
        margin-bottom: 20px;
    }

    #usernameInput {
        border: none;
        border-bottom: 1px solid black;
        margin-bottom: 20px;
    }

    #passwordregisterDiv {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    #passwordRepitregisterDiv {
        display: flex;
        flex-direction: column;
    }

    #passwordRepitInput {
        border: none;
        border-bottom: 1px solid black;
        
    }

    #passwordInput {
        border: none;
        border-bottom: 1px solid black;
    }

    #registerButton {
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
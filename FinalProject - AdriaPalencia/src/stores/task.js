import { defineStore } from "pinia";
import {supabase} from "@/lib/supabaseClient";

export default defineStore('task', {
    state() {
        return {
            taskList: [],
            user: [],
        }
    },
    actions: {

         async getUser(username, password) {

            let { data,error } =  await supabase.from('users').select().eq('username', username).eq('passw',password);
            this.user = data;
            if (error) {
                console.log("Something Went Wrong");
                return
            }

        },
        async register(_username, _name, _passw) {
            const { error } = await supabase
                .from('users')
                .insert({username: _username, name: _name, passw: _passw, role: "User"})
        },
        async getTaskList() {
            let { data,error } =  await supabase.from('tasks').select();
            
            this.taskList = data;
        }
        
    }
})
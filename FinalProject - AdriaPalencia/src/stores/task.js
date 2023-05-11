import { defineStore } from "pinia";
import {supabase} from "@/lib/supabaseClient";

export default defineStore('task', {
    state() {
        return {
            taskList: [],
            user: [],
            username: [],
            task: [],
            AllUsers: []
        }
    },
    actions: {
        async initAll() {
            this.username = localStorage.username;
        },
         async getUser(username, password) {

            let { data,error } =  await supabase.from('users').select().eq('username', username).eq('passw',password);
            this.user = data;
            this.username = data.username;
            if (error) {
                console.log("Something Went Wrong");
                return
            }

        },
        async getAllUsers() {
            let { data,error } =  await supabase.from('users').select();
            this.AllUsers = data;
            if (error) {
                console.log("Something Went Wrong");
                return
            }
        },
        async getUserByUsername(username){

            let { data,error } =  await supabase.from('users').select().eq('username', username);
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
            this.taskList = [];
            console.log(this.taskList);
            let { data,error } =  await supabase.from('tasks').select();
            
            this.taskList = data;
        },
        async newTask(title, description, color, assignee) {
            const { error } = await supabase
                .from('tasks')
                .insert({title: title, description: description, stage: "do",color: color, assignee: assignee})
            
        },
        async getTaskbyId(id) {
            const { data,error } = await supabase
                .from('tasks')
                .select().eq('id', id);

            this.task = data;
        },
        async updateTask(_id,_title,_description,_stage,_color,_assignee) {
            const { error } = await supabase
                .from('tasks')
                .update({title: _title, description: _description, stage: _stage,color: _color ,assignee: _assignee})
                .eq('id', _id)
        },
        async deleteTask(id) {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id',id)
        }
        
    }
})
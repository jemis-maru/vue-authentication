<template>
    <div>
        <input type="email" v-model="email">
        <input type="password" v-model="password">
        <button @click="register">register</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        register() {
            axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.VUE_APP_API_KEY, {
                email: this.email,
                password: this.password,
                returnSecureToken: true
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>
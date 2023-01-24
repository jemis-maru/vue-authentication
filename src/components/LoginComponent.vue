<template>
    <div>
        <input type="email" v-model="email">
        <input type="password" v-model="password">
        <button @click="login">login</button>
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
        login() {
            axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.VUE_APP_API_KEY, {
                email: this.email,
                password: this.password,
                returnSecureToken: true
            })
                .then(res => {
                    localStorage.setItem("token", res.data.idToken);
                    localStorage.setItem("refresh_token", res.data.refreshToken);
                    this.$router.push("/");
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>
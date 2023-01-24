<template>
    <div>home</div>
</template>

<script>
import axios from "../request.js";
export default {
    created() {
        axios.get("/users.json")
            .then(res => {
                console.log(res);
            })
    }
}
</script>
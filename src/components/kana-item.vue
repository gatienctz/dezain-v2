<template>
<v-btn>
    <div>{{ symbol }}</div>
    <div>{{ name }}</div>
</v-btn>
</template>

<script>
    export default {
        props : {
            symbol: { type: String, default: null },
            name: { type: String, default: null }
        }
    }
</script>
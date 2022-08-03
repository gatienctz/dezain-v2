<template>
<v-btn>
    <div v-if="isSymbol">{{ symbol }}</div>
    <div v-if="!isSymbol">{{ name }}</div>
</v-btn>
</template>

<script>
    export default {
        props : {
            symbol: { type: String, default: null },
            name: { type: String, default: null },
            isSymbol: { type: Boolean, default: null },
        }
    }
</script>
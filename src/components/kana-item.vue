<template>
    <v-card elevation="24" outlined tile>
        <v-card-title v-if="isSymbol">{{ symbol }}</v-card-title>
        <v-card-title v-if="!isSymbol">{{ name }}</v-card-title>
    </v-card>
</template>

<script>
export default {
    props: {
        symbol: { type: String, default: null },
        name: { type: String, default: null },
        isSymbol: { type: Boolean, default: null },
    }
}
</script>
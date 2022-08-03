<template>
    <v-card elevation="2" outlined tile>
        <v-hover v-if="isSymbol">
            <v-card @click="verifyAnswer(item)">
                <v-card-title>{{ item.kana }}</v-card-title>
            </v-card>
        </v-hover>
        <v-hover v-if="!isSymbol">
            <v-card @click="verifyAnswer(item)">
                <v-card-title>{{ item.roumaji }}</v-card-title>
            </v-card>
        </v-hover>
    </v-card>
</template>

<script>
export default {
    props: {
        item: { type: Object, default: null },
        isSymbol: { type: Boolean, default: null },
    }
}
</script>
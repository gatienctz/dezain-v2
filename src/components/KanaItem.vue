<template>
    <v-hover v-slot="{ isHovering, props }" :open-delay="0" :close-delay="0">
    <v-btn :height="256" :width="169" class="text-h2 rounded-0 d-flex align-center ma-2 pa-4" v-bind="props" :elevation="isHovering? 2 : 8">
        {{ value }}
    </v-btn>
    </v-hover>
</template>

<script>
export default {
    props: {
        value: { type: String, default: null },
    }
}
</script>
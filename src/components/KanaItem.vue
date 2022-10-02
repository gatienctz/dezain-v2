<template>
    <v-hover v-slot="{ isHovering, props }" :open-delay="0" :close-delay="0">
    <v-btn :height="256" :width="169" class="text-h2 rounded-0 d-flex align-center ma-2 pa-4" v-bind="props" :color="applyColor()" :elevation="isHovering? 2 : 8">
        {{ value }}
    </v-btn>
    </v-hover>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    props: {
        value: { type: String, default: null },
        isCorrect: { type: Boolean, default: false },
        isWrong: { type: Boolean, default: false }
    }
    ,setup(props){
        const applyColor = () => {
            if(props.isCorrect){
                return "success";
            }
            if(props.isWrong){
                return "error";
            }
        }
        return {
            applyColor
        }
    }
})
</script>
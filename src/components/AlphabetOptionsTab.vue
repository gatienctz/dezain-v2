<template>
    <v-container class="pa-0" fluid>
            <v-list nav density="compact" :lines="false" class="pa-0" mandatory :select-strategy="'multiple'" :selected="selectedVersions">
                    <v-list-subheader>Versions</v-list-subheader>
                    <v-list-item v-for="v in options.versions" :key="v.type" :value="v.type" :active="isActiveVersion(v.type)"
                    @click="toggleOptionVersion(v.type)">
                        <v-list-item-title start>{{ v.name }}</v-list-item-title>
                    </v-list-item>
            </v-list>
            <v-list nav density="compact" :lines="false" class="pa-0" mandatory :select-strategy="'multiple'" :selected="selectedTypes">
                <v-list-subheader>Types</v-list-subheader>
                <v-list-item v-for="t in options.types" :key="t.type" :value="t.type" :active="isActiveType(t.type)"
                    @click="toggleOptionType(t.type)">
                    <v-list-item-title start>{{ t.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
    </v-container>
</template>

<script lang="ts">

import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    props: ["selectedVersions", "selectedTypes", "value"],
    emits: ["update:selectedVersions", "update:selectedTypes"],
    setup(props, { emit }) {

        const options = require('@/resource/js/options.json');

        const isActiveVersion = (version: string) => props.selectedVersions.includes(version);
        const isActiveType = (type: string) => props.selectedTypes.includes(type);

        const toggleOptionVersion = (version: string) => {
            if (props.selectedVersions.includes(version)) {
                if (props.selectedVersions.length !== 1){
                    emit('update:selectedVersions',props.selectedVersions.filter((v: string) => v !== version));
                }
            }
            else {
                emit('update:selectedVersions', [...props.selectedVersions, version]);
            }
            
        };

        const toggleOptionType = (type: string) => {
            if (props.selectedTypes.includes(type)) {
                if (props.selectedTypes.length !== 1)
                emit('update:selectedTypes', props.selectedTypes.filter((t: string) => t !== type));
            }
            else {
                emit('update:selectedTypes', [...props.selectedTypes, type]);
            }
        }

        onMounted(() => {
            emit('update:selectedVersions', ["handakuon"]);
            emit('update:selectedTypes', ["kana"]);
            console.log(props.value);
        });

        return {
            emit,
            options,
            isActiveVersion,
            isActiveType,
            toggleOptionVersion,
            toggleOptionType
        };
    }
})
</script>
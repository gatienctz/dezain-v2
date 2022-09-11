<template>
    <v-container class="pa-0" fluid>
        <v-toolbar color="white" flat>
            <v-toolbar-title>
                {{ alphabet.name }}
            </v-toolbar-title>
        </v-toolbar>
        <v-container class="pa-0" fluid>
            <v-list nav density="compact" :lines="false" class="pa-0" mandatory select-strategy="multiple">
                <v-list-subheader>Versions</v-list-subheader>
                <v-list-item v-for="v in options.versions" :item="v" :key="v.type" :value="v.type" :active="isActiveVersion(v.type)" @click="toggleOptionVersion(v.type)">
                    <v-list-item-title start>{{ v.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
            <Button3D></Button3D>
            <v-list nav density="compact" :lines="false" class="pa-0" mandatory select-strategy="multiple">
                <v-list-subheader>Types</v-list-subheader>
                <v-list-item v-for="t in options.types" :key="t.type" :value="t.type" :active="isActiveType(t.type)" @click="toggleOptionType(t.type)">
                    <v-list-item-title start>{{ t.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-container>
    </v-container>
</template>

<script>
import { computed } from 'vue'
import Button3D from './Button3D.vue'
import options from '@/resource/js/options.js'

export default {
    props: {
        alphabet: {type: Object, default: null}
    },
    emits: ["update:selectedVersion", "update:selectedTypes"],
    setup(props, { emit }) {
        const isActiveVersion = computed(() => version => props.alphabet.selectedVersions.includes(version));
        const isActiveType = computed(() => type => props.alphabet.selectedTypes.includes(type));
        const toggleOptionVersion = version => {
            if (props.alphabet.selectedVersions.includes(version)) {
                emit("update:selectedVersion", props.alphabet.selectedVersions.filter(v => v !== version));
            }
            else {
                emit("update:selectedVersion", [...props.alphabet.selectedVersions, version]);
            }
        };
        const toggleOptionType = type => {
            if (props.alphabet.selectedTypes.includes(type)) {
                emit("update:selectedTypes", props.alphabet.selectedTypes.filter(t => t !== type));
            }
            else {
                emit("update:selectedTypes", [...props.alphabet.selectedTypes, type]);
            }
        };
        return {
            emit,
            options,
            isActiveVersion,
            isActiveType,
            toggleOptionVersion,
            toggleOptionType,
        };
    },
    components: { Button3D }
}
</script>
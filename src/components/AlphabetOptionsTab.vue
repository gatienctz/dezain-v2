<template>
    <v-container class="pa-0" fluid>
        <v-toolbar color="white" flat>
            {{selectedTypeOptions}}
            <v-toolbar-title>
                {{ versionName }}
            </v-toolbar-title>
        </v-toolbar>
        <v-container class="pa-0" fluid>
            <v-list nav density="compact" :lines="false" class="pa-0" mandatory select-strategy="multiple">
                <v-list-item v-for="v in versionOptions.options" :item="v" :key="v.type" :value="v.type" :active="isActiveVersion(v.type)" @click="toggleOptionVersion(v.type)">
                    <v-list-item-title start>{{ v.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
            <Button3D></Button3D>
            <v-list nav density="compact" :lines="false" class="pa-0" mandatory select-strategy="multiple">
                <v-list-subheader>{{ typeOptions.title }}</v-list-subheader>
                <v-list-item v-for="t in typeOptions.options" :key="t.type" :value="t.type" :active="isActiveType(t.type)" @click="toggleOptionType(t.type)">
                    <v-list-item-title start>{{ t.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-container>
    </v-container>
</template>

<script>
import { computed } from 'vue'
import Button3D from './Button3D.vue'

export default {
    props: {
        versionName: {
            type: String,
            required: true
        },
        versionOptions: { type: Object, default: null },
        typeOptions: { type: Object, default: null },
        selectedVersionOptions: { type: Array, default: () => [] },
        selectedTypeOptions: { type: Array, default: () => [] },
        objectName: { type: String, default: null }
    },
    emits: ["update:selectedVersions", "update:selectedTypes"],
    setup(props, { emit }) {
        const isActiveVersion = computed(() => version => props.selectedVersionOptions.includes(version));
        const isActiveType = computed(() => type => props.selectedTypeOptions.includes(type));
        const toggleOptionVersion = version => {
            if (props.selectedVersionOptions.includes(version)) {
                emit("update:selectedVersions", props.selectedVersionOptions.filter(v => v !== version));
            }
            else {
                emit("update:selectedVersions", [...props.selectedVersionOptions, version]);
            }
        };
        const toggleOptionType = type => {
            if (props.selectedTypeOptions.includes(type)) {
                emit("update:selectedTypes", props.selectedTypeOptions.filter(t => t !== type));
                console.log("emit remove");
            }
            else {
                emit("update:selectedTypes", [...props.selectedTypeOptions, type]);
                console.log("emit append " + [...props.selectedTypeOptions, type]);
            }
        };
        return {
            emit,
            isActiveVersion,
            isActiveType,
            toggleOptionVersion,
            toggleOptionType,
        };
    },
    components: { Button3D }
}
</script>
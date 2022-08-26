<template>
    <v-container class="pa-0 mx-auto">
        <v-toolbar color="white" flat>
            <v-toolbar-title>
                {{ store[objectName].name }}
            </v-toolbar-title>
        </v-toolbar>
        <v-container class="pa-0 mx-auto">
            <v-list nav density="compact"  :lines="false" class="pa-0" mandatory select-strategy="multiple">
                <v-list-item v-model="selectedVersions" v-for="v in versionOptions.options" :key="v.type" :value="v.type">
                    <v-list-item-title start>{{ v.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list nav density="compact" :lines="false" class="pa-0" mandatory select-strategy="multiple">
                <v-list-title>{{ typeOptions.title }}</v-list-title>
                <v-list-item v-for="t in typeOptions.options" :key="t.type" v-model="selectedTypes" :value="t.type">
                    <v-list-item-title start>{{ t.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-container>
    </v-container>
</template>

<script>

import { useStore } from '@/stores/store'
import { computed, onMounted } from 'vue'

export default {
    props: {
        versionOptions: { type: Object, default: null },
        typeOptions: { type: Object, default: null },
        objectName: { type: String, default: null }
    },
    setup(props) {
        const store = useStore();

        const selectedVersions = computed({
            get() {
                return store[props.objectName].selectedVersions;
            },
            set(newValue) {
                store[props.objectName].selectedVersions = newValue;
            }
        })
        const selectedTypes = computed({
            get() {
                return store[props.objectName].selectedTypes;
            },
            set(newValue) {
                console.log(store[props.objectName].selectedTypes, newValue);
                store[props.objectName].selectedTypes = newValue;
            }
        })

        onMounted(() => {
            store[props.objectName].selectedTypes = [props.typeOptions.options[0].type];
            store[props.objectName].selectedVersions = [props.versionOptions.options[0].type];
        })

        return {
            selectedTypes,
            selectedVersions,
            store
        }
    }
}
</script>
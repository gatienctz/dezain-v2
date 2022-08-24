<template>
    <v-card>
        <v-toolbar color="white" flat>
            <v-toolbar-title>
                {{ store[objectName].name }}
            </v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-subheader>{{ versionOptions.title }}</v-subheader>
            <v-divider></v-divider>
            <v-checkbox v-model="selectedVersions" class="pa-1 d-block-flex" v-for="v in versionOptions.options"
                :input-value="true" :key="v.type" :value="v.type" hide-details color="info" :label="v.name">
            </v-checkbox>
            <v-subheader>{{ typeOptions.title }}</v-subheader>
            <v-divider></v-divider>
            <v-checkbox v-model="selectedTypes" class="pa-1 d-block-flex" v-for="t in typeOptions.options" :key="t.type"
                :input-value="true" :value="t.type" hide-details color="info" :label="t.name">
            </v-checkbox>
            <!-- <v-checkbox v-for="t in typeOptions.options" @input="overrideModelValue()" :key="t.type" :value="t.type" hide-details :color="info" :input-value="isSelected(t.type)" :label="t.name"></v-checkbox> -->
        </v-container>
    </v-card>
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
                store[props.objectName].selectedTypes = newValue;
            }
        })

        onMounted(() => {
            store[props.objectName].selectedTypes.push(props.typeOptions.options[0].type);
            store[props.objectName].selectedVersions.push(props.versionOptions.options[0].type);
        })

        return {
            selectedTypes,
            selectedVersions,
            store
        }
    }
}
</script>
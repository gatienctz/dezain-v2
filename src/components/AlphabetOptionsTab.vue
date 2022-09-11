<template>
    <v-container class="pa-0" fluid>
        <v-toolbar color="white" flat>
            <v-toolbar-title>
                {{ alphabetModel.name }}
            </v-toolbar-title>
        </v-toolbar>
        <v-container class="pa-0" fluid>
            <v-list nav density="compact" :lines="false" class="pa-0" mandatory select-strategy="multiple">
                <v-list-subheader>Versions</v-list-subheader>
                <v-list-item v-for="v in options.versions" :item="v" :key="v.type" :value="v.type" v-model="alphabetModel.selectedVersions">
                    <v-list-item-title start>{{ v.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
            <Button3D></Button3D>
            <v-list nav density="compact" :lines="false" class="pa-0" mandatory select-strategy="multiple">
                <v-list-subheader>Types</v-list-subheader>
                <v-list-item v-for="t in options.types" :key="t.type" :value="t.type" v-model="alphabetModel.selectedTypes">
                    <v-list-item-title start>{{ t.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-container>
    </v-container>
</template>

<script>
import { computed, defineComponent, watch, toRefs } from 'vue'
import Button3D from './Button3D.vue'
import options from '@/resource/js/options.json'

export default defineComponent({
    props: {
        alphabet: {type: Object, default: null}
    },
    emits: ["update:alphabet"],
    setup(props, { emit }) {

        const alphabetModel = toRefs(props.alphabet);
        watch(alphabetModel, (newValue) => {
            emit('update:alphabet', newValue);
        })

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
            alphabetModel,
            isActiveVersion,
            isActiveType,
            toggleOptionVersion,
            toggleOptionType,
        };
    },
    components: { Button3D }
})
</script>
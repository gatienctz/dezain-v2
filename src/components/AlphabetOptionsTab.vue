<template>
    <v-container class="pa-0" fluid>
        <v-list>
            <v-list-group>
                <template v-slot:activator="{ props }">
                    <v-list-item class="pa-0" v-bind="props" :title="alphabet.name.value" :append-icon="'null'"
                        :preppend-icon="'null'" @click="openOptions"></v-list-item>
                </template>

                <v-list nav density="compact" :lines="false" class="pa-0" mandatory :select-strategy="'multiple'"
                    :selected="alphabet.selectedVersions.value">
                    <v-list-subheader>Versions</v-list-subheader>
                    <v-list-item v-for="v in versions" :key="v.code" :value="v.code" :active="isActiveVersion(v.code)"
                        @click="toggleOptionVersion(v.code)">
                        <v-list-item-title start>{{ v.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-list nav density="compact" :lines="false" class="pa-0" mandatory :select-strategy="'multiple'"
                    :selected="alphabet.selectedTypes.value">
                    <v-list-subheader>Types</v-list-subheader>
                    <v-list-item v-for="t in types" :key="t.code" :value="t.code" :active="isActiveType(t.code)"
                        @click="toggleOptionType(t.code)">
                        <v-list-item-title start>{{ t.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-list-group>
        </v-list>
    </v-container>
    <v-col :style="'border: solid grey 1px;'" cols="1.5">
        <p>Versions : {{ alphabet.selectedVersions }}</p>
        <p>Types : {{ alphabet.selectedTypes }}</p>
    </v-col>
</template>

<script lang="ts">

import { onMounted, defineComponent, toRefs, PropType, ToRefs } from 'vue'
import type { Alphabet } from '@/models/Alphabet'
import type { Option } from '@/models/Option'

export default defineComponent({
    props: {
        value: { type: Object as PropType<Alphabet>, required: true }
    },
    emits: ["update:value"],
    setup(props, { emit }) {

        const options: Option[] = require('@/resource/js/options.json');
        const versions: Option[] = options.filter(o => o.type === "version");
        const types: Option[] = options.filter(o => o.type === "type");

        const alphabet: ToRefs<Alphabet> = toRefs(props.value);

        const isActiveVersion = (version: string) => alphabet.selectedVersions.value.includes(version);
        const isActiveType = (type: string) => alphabet.selectedTypes.value.includes(type);

        const toggleOptionVersion = (version: string) => {
            if (alphabet.selectedVersions.value.includes(version)) {
                if (alphabet.selectedVersions.value.length !== 1) {
                    alphabet.selectedVersions.value = alphabet.selectedVersions.value.filter((v: string) => v !== version);
                }
            }
            else {
                alphabet.selectedVersions.value = [...alphabet.selectedVersions.value, version];
            }
            emit('update:value', alphabet);
        };

        const toggleOptionType = (type: string) => {
            if (alphabet.selectedTypes.value.includes(type)) {
                if (alphabet.selectedTypes.value.length !== 1)
                    alphabet.selectedTypes.value = alphabet.selectedTypes.value.filter((t: string) => t !== type);
            }
            else {
                alphabet.selectedTypes.value = [...alphabet.selectedTypes.value, type];
            }
            emit('update:value', alphabet);
        }

        const openOptions = (event: Event) => {
            console.log("Options opened ");
            console.log(event.target);
        }

        onMounted(() => {
            alphabet.selectedVersions.value = ["handakuon"];
            alphabet.selectedTypes.value = ["kana"];
            emit('update:value', alphabet);
        });

        return {
            emit,
            versions,
            types,
            alphabet,
            isActiveVersion,
            isActiveType,
            toggleOptionVersion,
            toggleOptionType,
            openOptions
        };
    }
})
</script>

<style>
.v-list-item__append {
    display: none !important;
}
</style>
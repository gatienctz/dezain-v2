<template>
    <v-navigation-drawer :style="'border: solid grey 1px;'" location="left" rail expand-on-hover>
        <v-list>
            <v-list-item prepend-icon="mdi-home" title="Home" @click="goTo('Home')"></v-list-item>
            <v-list-group :value="GameMode.Tile">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-account-circle" :title="GameMode.Tile"></v-list-item>
                </template>
                <v-list nav density="compact" :lines="false" class="pa-0" mandatory>
                    <v-list-item :value="AlphabetType.Katakana" :title="AlphabetType.Katakana" @click="startGame()" />
                    <v-list-item :value="AlphabetType.Hiragana" :title="AlphabetType.Hiragana" @click="startGame()" />
                    <v-list-item :value="AlphabetType.Both" :title="AlphabetType.Both" @click="startGame()" />
                </v-list>
            </v-list-group>
            <v-list-group :value="GameMode.Keyboard">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" prepend-icon="mdi-account-circle" :title="GameMode.Keyboard">
                    </v-list-item>
                </template>
                <v-list nav density="compact" :lines="false" class="pa-0" mandatory>
                    <v-list-item :title="AlphabetType.Katakana" :value="AlphabetType.Katakana" @click="startGame()" />
                    <v-list-item :title="AlphabetType.Hiragana" :value="AlphabetType.Hiragana" @click="startGame()" />
                    <v-list-item :title="AlphabetType.Both" :value="AlphabetType.Both" @click="startGame()" />
                </v-list>
            </v-list-group>
        </v-list>
        <v-col :style="'border: solid grey 1px;'" cols="1.5">
            <p>Type : {{ selectedAlphabetType }}</p>
            <p>Mode : {{ selectedGameMode }}</p>
        </v-col>
    </v-navigation-drawer>
</template>
  
<script lang="ts">

import { defineComponent } from "vue"

export default defineComponent({
    name: 'App',
    setup() {
        const selectedAlphabetType: Ref<AlphabetType[]> = ref([]);
        const selectedGameMode: Ref<GameMode[]> = ref([]);
        const goTo = (page: String) => {
        }


        const buildMenu = () => {
            var items: Array<Object> = [];
            const menuItem: Object = {'title': 'Menu', 'prependIcon': 'mdi-home'};
            items.push(menuItem);
            items.push(addDivider);
            items.push(addItemGroup("Tuile"));
            items.push();
        }

        const addDivider = () => {
            return {'type': 'divider'}
        }

        const addItemGame = (id: String, name: String) => {
            return {'title': name, 'value': id}
        }

        const addItemGroup = (groupName: String) => {
            return { 'type': 'subheader', 'title': groupName };
        }

        return {

        }
    }
})
</script>
  
<style>

</style>
  
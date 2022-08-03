<template>
    <v-card>
        <v-toolbar color="white" flat>
            <v-toolbar-title>
                {{ model.name }}
            </v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-subheader>{{ alphabetOptions.title }}</v-subheader>
            <v-divider></v-divider>
            <v-list-item-group multiple v-model="model.selectedAlphabetOptions">
                <v-list-item v-for="a in alphabetOptions.options" :key="`item-${i}`" :value="a.type">
                    <template v-slot:default="{ active }">
                        <v-list-item-content>
                            <v-list-item-action>
                                <v-checkbox :input-value="active"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-title v-text="a.name"></v-list-item-title>
                        </v-list-item-content>
                    </template>
                </v-list-item>
            </v-list-item-group>
            <v-subheader>{{ typeOptions.title }}</v-subheader>
            <v-divider></v-divider>
            <v-list-item-group multiple v-model="model.selectedTypes">
                <v-list-item v-for="t in typeOptions.options">
                    <template v-slot:default="{ active }">
                        <v-list-item-content>
                            <v-list-item-action>
                                <v-checkbox :input-value="active"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-title v-text="t.name"></v-list-item-title>
                        </v-list-item-content>
                    </template>
                </v-list-item>
            </v-list-item-group>
        </v-container>
    </v-card>
</template>

<script>
export default {
    props: {
        alphabetOptions: { type: Object, default: null },
        typeOptions: { type: Object, default: null },
        model: { type: Object, default: null }
    }
}
</script>
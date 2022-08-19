<template>
    <v-card class="h-auto w-auto">
        <v-toolbar color="white" flat>
            <v-toolbar-title>
                {{ model.name }}
            </v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-subheader>{{ versionOptions.title }}</v-subheader>
            <v-divider></v-divider>
            <v-list-item-group multiple>
                <v-list-item hide-details v-for="a in versionOptions.options" :key="a.type" :value="a.type">
                    <template v-slot:default="{ active }">
                            <v-list-item-action hide-details>
                                <v-checkbox :color="info" @input="handleInputVersion" :input-value="active" :label="a.name"></v-checkbox>
                            </v-list-item-action>
                    </template>
                </v-list-item>
            </v-list-item-group>
            <v-subheader>{{ typeOptions.title }}</v-subheader>
            <v-divider></v-divider>
            <v-list-item-group multiple>
                <v-list-item v-for="t in typeOptions.options" :key="t.type" :value="t.type">
                    <template v-slot:default="{ active }">
                        <v-list-item-content>
                            <v-list-item-action>
                                <v-checkbox :color="info" @input="handleInputType" :input-value="active" :label="t.name"></v-checkbox>
                            </v-list-item-action>
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
        versionOptions: { type: Object, default: null },
        typeOptions: { type: Object, default: null },
        model: { type: Object, default: null }
    },
    emits: [
        'clickVersionOptions',
        'clickTypeOptions'
    ],
    setup(props, { emit }) {
        const handleInputVersion = (value) => {
            emit('clickVersionOptions', value)
        }
        const handleInputType = (value) => {
            emit('clickTypeOptions', value)
        }
        return {
            handleInputType,
            handleInputVersion
        }
    }
}
</script>
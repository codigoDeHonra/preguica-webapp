<template>
    <v-btn
      color="red ligthen-3"
      text
      outlined
      v-on:input="$emit('input', $event)"
      v-on="$listeners"
      v-bind="$attrs"
    >
        Cancelar
    </v-btn>
</template>

<script>
    export default {
      props: {
        label: {
          type: String,
          required: false,
        },
      },
    };
</script>

<style lang="scss" scoped></style>

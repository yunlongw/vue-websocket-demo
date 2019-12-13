<template>
    <div class="index">
        <b-input-group prepend="请输入内容" class="mt-3">
            <b-form-input v-if="readyState" v-model="newMsg" @keyup.enter="send"></b-form-input>
            <b-form-input v-else v-model="newMsg"></b-form-input>
            <b-input-group-append>
                <b-button v-if="readyState" variant="outline-success" @click="send">发送</b-button>
                <b-button v-else variant="outline-danger" disabled="disabled" @click="send">重新链接中……</b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
    export default {
        props: ['readyState'],
        data() {
            return {
                newMsg: "1111"
            };
        },
        methods: {
            send() {
                if (this.newMsg !== "") {
                    this.$emit('sendMessage', this.newMsg)
                    this.newMsg = '';
                }

            }
        }
    }
</script>
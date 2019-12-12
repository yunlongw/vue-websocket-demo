<template>
    <div class="index">
        <b-input-group prepend="请输入内容" class="mt-3">
            <b-form-input v-model="newMsg" @keyup.enter="send"></b-form-input>
            <b-input-group-append>
                <b-button variant="outline-success" @click="send">发送</b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
    export default {
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
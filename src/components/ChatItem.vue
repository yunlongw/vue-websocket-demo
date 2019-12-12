<template>
    <div class="chat-item">
        <div v-if="!me" class="other-chat">
            <img class="img" src="https://avatars2.githubusercontent.com/u/10786476?v=4" alt="yunlongw"
                 style="width: 40px; height: 40px; border-radius: 50%;">
            <div class="nt"><span>{{name}}</span><span>{{time}}</span></div>
            <div class="msg">{{msg}}</div>
        </div>

        <div v-if="me" class="me-chat">
            <img class="img" src="https://avatars2.githubusercontent.com/u/10786476?v=4" alt="yunlongw"
                 style="width: 40px; height: 40px; border-radius: 50%;">
            <div class="nt"><span>{{time}}</span><span>{{name}}</span></div>
            <div class="msg">{{msg}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'chat-item',
        props: ['me', 'name', 'img', 'msg', 'time', 'href'],
        components: {},
        data() {
            return {};
        },

        computed: {},

        watch: {},

        methods: {}
    }
</script>

<style lang="scss" scoped>
    .chat-item {
        width: 100%;
        margin: 0.7rem 0;

        .other-chat {
            width: 100%;
            position: relative;

            .msg {
                font-size: 1rem;
                left: 3rem;
                top: 1rem;
                position: absolute;
                color: #686868;
            }

            .nt {
                font-size: 0.2rem;
                left:3rem;
                top: -0.4rem;
                position: absolute;
                color: #686868;
                span {
                    padding-right: 0.3rem;
                }
                span:nth-child(1) {
                    font-size: 0.1rem;
                }
            }

            .img {
                float: left;
            }
        }

        .me-chat {
            width: 100%;
            position: relative;

            .msg {
                font-size: 1rem;
                right: 3rem;
                top: 1rem;
                position: absolute;
                color: #686868;
            }

            .nt {
                font-size: 0.2rem;
                right:3rem;
                top: -0.4rem;
                position: absolute;
                color: #686868;
                span {
                    padding-left: 0.4rem;
                }
                span:nth-child(1) {
                    font-size: 0.1rem;
                }
            }

            .img {
                float: right;

            }
        }
    }
</style>
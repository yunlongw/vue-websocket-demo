<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 border">
                <div class="row" style="height: 100%">
                    <div class="col-2" style="height: 100%;background-color: #42b983">
                        <img class="img" src="https://avatars2.githubusercontent.com/u/10786476?v=4" alt="yunlongw"
                             style="width: 40px; height: 40px; border-radius: 50%; margin-left: -8px; margin-top: 5px;">
                    </div>
                    <div class="col">
                        <div>
                            <b-form-input></b-form-input>
                        </div>
                        <div>
                            <ul style="margin-top: 1rem">
                                <li>好友 1</li>
                                <li>好友 1</li>
                                <li>好友 1</li>
                                <li>好友 1</li>
                                <li>好友 1</li>
                                <li>好友 1</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col border">
                <Header></Header>
                <div id="chat-messages" data-spy="scroll" data-target="#list-example" data-offset="0"
                     class="scrolls-message">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="(item, k) in MessageList" :key="k">
                            <ChatItem :me="item.me" :name="item.username" :time="item.time" :msg="item.msg"></ChatItem>
                        </li>
                    </ul>
                </div>
                <Footer v-on:sendMessage="sendMessage"></Footer>
            </div>
        </div>
    </div>

</template>
<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import ChatItem from '@/components/ChatItem.vue'

    export default {
        data() {
            return {
                minID: 1,
                m: true,
                ipadd: "127.0.0.1:8001/ws",
                ws: null,
                uid: Date.parse(new Date()),
                MessageList: [
                    {
                        id: 1,
                        username: "张三",
                        msg: "内容",
                        me: true,
                        time: "十分钟前"
                    },
                ],
                currentTab: 1
            };
        },

        created: function () {
            this.webSocket();
        },

        components: {
            Header,
            Footer,
            ChatItem
        },
        methods: {
            sendMessage: function (value) {
                this.send(value);
                var element = document.getElementById('chat-messages');
                element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
            },
            send: function (value) {

                var joins = JSON.stringify({
                    Cmd: "send",
                    Seq: "asdfasdf",
                    Data: {
                        uid: this.uid,
                        email: this.email,
                        username: this.username,
                        message: value,
                    }
                });
                this.ws.send(joins);

                window.console.log(value)
            },
            webSocket: function () {
                var self = this;
                this.ws = new WebSocket('ws://' + this.ipadd);
                this.ws.addEventListener("open", function (e) {
                    window.console.log("open", e);
                });

                this.ws.addEventListener("close", function (e) {
                    self.eventClose(e);
                });

                this.ws.addEventListener("error", function (e) {
                    window.console.log("error", e);
                });

                this.ws.addEventListener('message', function (e) {
                    window.console.log("message", e);
                    this.minID++;
                    this.m = !this.m;

                    self.MessageList.push({
                        id: this.minID,
                        username: this.m ? "张三" : "李四",
                        msg: "asdsad",
                        me: this.m,
                        time: "六分钟前"
                    });
                });
            },
            eventClose: function (e) {
                window.console.log("close", e);
                window.console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                this.webSocket();
            },
        }
    }
</script>

<style>
    .scrolls-message {
        min-height: 10vh;
        height: 80vh;
        width: 100%;
        overflow-y: scroll;
    }
</style>
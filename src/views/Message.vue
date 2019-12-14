<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 border">
                <div class="row" style="height: 100%">
                    <div class="col-2" style="height: 100%;background-color: #42b983; position: relative;">
                        <img class="img" src="https://avatars2.githubusercontent.com/u/10786476?v=4" alt="yunlongw"
                             style="width: 40px; height: 40px; border-radius: 50%; margin-left: -8px; margin-top: 5px;">
                        <div style="position: absolute; bottom: 0;">
                            <b-button class="btn btn-danger btn-sm" style="margin-bottom: 0" @click="exit">exit
                            </b-button>
                        </div>
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
                <Footer :readyState="lockReconnect" v-on:sendMessage="sendMessage"></Footer>
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
                lockReconnect: false,//是否真正建立连接
                timeout: 30 * 1000,//30秒一次心跳
                timeoutObj: null,//心跳心跳倒计时
                serverTimeoutObj: null,//心跳倒计时
                timeoutnum: null,//断开 重连倒计时
                selectUID: null,

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
            this.initWebSocket();
        },

        components: {
            Header,
            Footer,
            ChatItem
        },
        methods: {
            sendMessage: function (value) {
                var that = this;
                that.websocketsend(value);
                // var element = document.getElementById('chat-messages');
                // element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
            },

            initWebSocket() {//建立连接
                window.console.log("开始链接");
                const ws_url = 'ws://' + this.ipadd;
                //建立连接
                this.ws = new WebSocket(ws_url);
                //连接成功
                this.ws.onopen = this.OnOpen;
                //连接错误
                this.ws.onerror = this.OnError;
                //接收信息
                this.ws.onmessage = this.OnMessage;
                //连接关闭
                this.ws.onclose = this.onclose;
            },

            OnOpen() {//连接成功事件
                window.console.log("链接成功");
                var that = this;
                that.lockReconnect = true;
                //发送用户数据
                var userToken = localStorage.getItem("userToken");
                var data = JSON.stringify({
                    Cmd: "login",
                    Seq: "",
                    Data: {
                        userId: userToken,
                        ChatId: 1,
                    },
                });
                that.ws.send(data);
                //开启心跳
                this.start();
            },

            OnError() {//连接失败事件
                //错误
                window.console.log("WebSocket连接发生错误");
                //错误提示
                //重连
                this.reconnect();
            },
            onclose(e) {//连接关闭事件
                var that = this;
                that.lockReconnect = false;
                //关闭
                window.console.log("connection closed (" + e.code + ")");
                //重连
                that.reconnect();
            },
            OnMessage(e) {//接收服务器推送的信息
                //数据发送
                var that = this;
                var data = JSON.parse(e.data);

                switch (data.cmd) {
                    case "heartbeat": {
                        this.reset();
                        window.console.log("heartbeat");
                    }
                        break;
                    case "send": {
                        window.console.log("send");
                    }
                        break;
                    case "msg": {
                        this.minID++;
                        that.MessageList.push({
                            id: this.minID,
                            username: this.m ? "张三" : "李四",
                            msg: "asdasd",
                            me: this.m,
                            time: "六分钟前"
                        });
                    }
                        break;

                    case "login": {
                        window.console.log("socket 登录成功");
                        var message = JSON.stringify({
                            Cmd: "chat",
                            Seq: "",
                            Data: {
                                ChatId: 1,
                            },
                        });
                        that.ws.send(message);

                    }
                        break;
                    case "chat" : {
                        window.console.log("join 群组成功");
                    }

                        break;
                    case "groupList" : {
                        window.console.log("群组列表");
                        window.console.log(data.data);
                    }

                        break;
                    default:
                        break;
                }
                window.console.log("message", e);
            },

            websocketsend(msg) {//向服务器发送信息
                var that = this;
                window.console.log(msg);
                if (this.lockReconnect) {
                    var data = this.getRequest("send", "", msg);
                    that.ws.send(data);
                }
            },

            heartJson() {
                return JSON.stringify({
                    Cmd: "heartbeat",
                    Seq: "asdfasdf",
                    Data: {}
                });
            },


            getRequest(cmd, seq, data) {
                return JSON.stringify({
                    Cmd: cmd,
                    Seq: seq,
                    Data: data
                });
            },

            sendHeartJson() {
                this.ws.send(this.heartJson());
            },

            reset() {//重置心跳
                var that = this;
                //清除时间
                clearTimeout(that.timeoutObj);
                clearTimeout(that.serverTimeoutObj);
                //重启心跳
                that.start();
            },

            reconnect() {//重新连接
                window.console.log("重新链接");
                var that = this;
                if (that.lockReconnect) {
                    return;
                }

                //没连接上会一直重连，设置延迟避免请求过多
                that.timeoutnum && clearTimeout(that.timeoutnum);

                that.timeoutnum = setTimeout(function () {
                    //新连接
                    that.initWebSocket();
                    // that.lockReconnect = false;
                }, 5000);
            },

            start() {//开启心跳
                var that = this;
                that.timeoutObj && clearTimeout(that.timeoutObj);
                that.serverTimeoutObj && clearTimeout(that.serverTimeoutObj);

                that.timeoutObj = setTimeout(function () {
                    window.console.log("heartCheck");
                    //这里发送一个心跳，后端收到后，返回一个心跳消息，
                    if (that.ws.readyState === 1) {//如果连接正常
                        that.sendHeartJson();
                        // that.ws.send(that.heartJson());
                    } else {//否则重连
                        window.console.log("readyState 状态异常");
                        that.reconnect();
                    }


                }, that.timeout)
            },

            exit() {
                this.ws.close();
                localStorage.clear();
                this.$router.push('/login')
            },

            groupList() {
                var data = this.getRequest("grouplist", "", "");
                this.ws.send(data);
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
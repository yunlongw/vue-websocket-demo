<template>
    <div class="container">
        <div class="login-box">
            <div class="login-logo">
                <b>聊天室</b>
            </div>
            <!-- /.login-logo -->
            <div class="login-box-body">
                <p class="login-box-msg">登录</p>

                <div class="form-group has-feedback 1">
                    <input type="text" class="form-control" placeholder="用户名" name="username" v-model="UserName"
                           id="username">
                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                </div>
                <div class="form-group has-feedback 1">
                    <input type="password" class="form-control" placeholder="密码" name="password" v-model="PassWord"
                           id="password">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>
                <div class="row">
                    <button type="submit" class="btn btn-primary btn-block" @click="login">登录</button>
                </div>

            </div>
            <!-- /.login-box-body -->
        </div>
    </div>
</template>

<style>
    .login-box {
        width: 360px;
        text-align: center;
        margin: 7% auto;
    }

    .login-box-msg {
        margin: 0;
        text-align: center;
        padding: 0 20px 20px 20px;
    }
</style>
<script>
    import axios from "axios";

    export default {
        data() {
            return {
                UserName: "13666282978",
                PassWord: "12345678",
                host: "http://127.0.0.1:9292",
                debug: true,
            };
        },
        methods: {
            login() {
                this.println(this.UserName);
                this.println(this.PassWord);
                var url = this.host + "/auth";
                let data = new FormData();
                data.append('username', this.UserName);
                data.append('password', this.PassWord);

                if (this.UserName !== "" && this.PassWord !== "") {
                    axios.post(url, data).then(res => {
                        this.println(res);
                        if (res.data.code === 200) {
                            this.println("登录成功");
                            localStorage.setItem("userToken", res.data.data.token);
                            this.$router.push('/message')
                        } else {
                            this.println("登录失败");
                        }
                    }).catch(err => {
                        this.println("请求失败");
                        this.println(err)

                    });
                } else {
                    const message = this.name === "" ? "请输入用户名" : "请输入密码";
                    this.println(message)
                }
            },
            println(e) {
                if (this.debug) {
                    window.console.log(e)
                }
            }


        }
    }
</script>
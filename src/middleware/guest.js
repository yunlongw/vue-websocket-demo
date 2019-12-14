export default function guest({next}) {
    var userToken = localStorage.getItem("userToken");
    window.console.log(userToken);
    if (userToken) {
        return next({
            name: 'message'
        })
    }

    return next()
}

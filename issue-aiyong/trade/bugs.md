```
if (host == '//platformshops.aiyongtech.com') {
    host = 'https://platformshops.aiyongtech.com';
} else if (host == '//sms.aiyongtech.com') {
    host = 'https://sms.aiyongtech.com'
} else if (host == '//topapigateway.aiyongtech.com') {
    host = 'https://topapigateway.aiyongtech.com'
} else if (host =='//openad.aiyongtech.com') {
    host = 'https://openad.aiyongtech.com'
} else if (host == '//mtrade.aiyongtech.com') {
    host = 'https://mtrade.aiyongtech.com'
}
```

```
my.getSetting({
    success: ({ authSetting }) => {
        if (!authSetting.camera) {
            // 用户点击同意的埋点：无法直接监听用户点击了同意
            tradeBeacon({ page: 'scanAndSendButton', func: 'visitCameraSystemDialogAgree' });
        }
    }
})
```

Validator({
    form: '#form-1',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    onSubmit: function (data) {
        console.log(data)
    },
    rules: [
        Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
        Validator.isRequired('#email'),
        Validator.isEmail('#email'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#password_confirmation'),
        Validator.isRequired('input[name="gender"]'),
        Validator.isConfirmed('#password_confirmation', function () {
            return document.querySelector('#form-1 #password').value
        }, 'Mật khẩu nhập lại không đúng')
    ]
})
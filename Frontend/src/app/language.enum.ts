export enum LanguageText {
    Login_Username = 'Username',
    Login_Password = 'Password',
    Login_Confirm_Password = 'Confirm Password',
    Login_Email = 'Email',
    Btn_Login = 'Login',
    Btn_Login_Text = 'You already have an account?',
    Btn_Register = 'Register',
    Btn_Register_Text = 'You don\'t have an account yet?',
}

export const LANG_EN: { [key in keyof typeof LanguageText]: string } = {
    Login_Username: 'Username',
    Login_Password: 'Password',
    Login_Confirm_Password: 'Confirm Password',
    Login_Email: 'Email',
    Btn_Login: 'Login',
    Btn_Login_Text: 'You already have an account?',
    Btn_Register: 'Register',
    Btn_Register_Text: 'You don\'t have an account yet?',
};

export const LANG_HU: { [key in keyof typeof LanguageText]: string } = {
    Login_Username: 'Felhasználónév',
    Login_Password: 'Jelszó',
    Login_Confirm_Password: 'Jelszó Újra',
    Login_Email: 'Email',
    Btn_Login: 'Belépés',
    Btn_Login_Text: 'Már rigsztráltál?',
    Btn_Register: 'Regisztráció',
    Btn_Register_Text: 'Még nincs fiókod?',
};

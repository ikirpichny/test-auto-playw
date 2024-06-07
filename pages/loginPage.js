class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailInputSelector = 'email-form-email-input';
      this.submitEmailButtonSelector = 'email-form-submit-button';
      this.verificationCodeInputSelector = 'div[data-testid="verify-email-form-code-input"]';
    }
  
    async fillEmail(email) {
      await this.page.getByTestId(this.emailInputSelector).fill(email);
    }
  
    async submitEmail() {
      await this.page.getByTestId(this.submitEmailButtonSelector).click();
    }
  
    async fillVerificationCode(code) {
      const container = await this.page.waitForSelector(this.verificationCodeInputSelector);
      const inputs = await container.$$('input');
  
      if (inputs.length !== code.length) {
        throw new Error('Количество input элементов не соответствует длине кода');
      }
  
      for (let i = 0; i < inputs.length; i++) {
        await inputs[i].fill(code[i]);
      }
    }

    async loginWithEmail(email, code) {
      await this.fillEmail(email);
      await this.submitEmail();
      await this.fillVerificationCode(code);
    }
  }
  
  export { LoginPage };
  
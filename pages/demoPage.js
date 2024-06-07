class DemoPage {
    constructor(page) {
      this.page = page;
      this.imageSelector = 'img';
      this.blockchainSelector = '#blockchain';
      this.purchaseImageUrlSelector = '#purchase-image-url';
      this.submitButtonSelector = 'button:has-text("Submit")';
      this.iframeSelector = 'iframe';
      this.payrowSelector = 'payrow';
    }
  
    async goto() {
      await this.page.goto('https://sandbox-platform.faraway.com/demo/');
    }
  
    async connectInNewTab() {
      await this.page.getByRole('button', { name: 'Connect in new tab' }).click();
    }

    async getImageUrl() {
      const imageElement = await this.page.$(this.imageSelector);
      const imageUrl = imageElement ? await imageElement.getAttribute('src') : '';
      return imageUrl;
    }

    async selectBlockchainOption(option) {
      await this.page.selectOption(this.blockchainSelector, option);
    }

    async fillPurchaseImageUrl(url) {
      await this.page.fill(this.purchaseImageUrlSelector, url);
    }

    async clickSubmitButton() {
      await this.page.click(this.submitButtonSelector);
    }

    async waitForiFrame() {
      await this.page.waitForSelector(this.iframeSelector);
    }

    async clickForPay() {
      await this.page.frameLocator(this.iframeSelector).getByTestId(this.payrowSelector).click();
    }
  }
  
  export { DemoPage };
  
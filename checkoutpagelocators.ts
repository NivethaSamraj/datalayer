import { Page } from '@playwright/test';
const cardFrame = (
    page: Page
) =>
    page.frameLocator(
        '#frame_carddetails'
    );
/**
 * Base locator repository for Checkout Page.
 *
 * Purpose:
 * - Contains all common locators shared across brands.
 * - Acts as the master source of locator keys for this page.
 * - Override files should reuse these keys when a locator value differs for a brand.
 *
 * Example:
 * Base:
 *   userName -> '#userName'
 *
 * Brand Override:
 *   userName -> '#usernameInput'
 *
 * Notes:
 * - Add new common locators here when they are applicable to all brands.
 * - Avoid adding brand-specific locators in this file.
 * - Override files use this file for IntelliSense and key suggestions.
 */
export const checkoutBasePage = {

    checkoutAsGuestButton: (page: Page) => page.getByText('Checkout as Guest'),
    txtFirstName: (page: Page) => page.getByRole('textbox', { name: 'First Name' }),
    txtLastName: (page: Page) => page.getByRole('textbox', { name: 'Last Name' }),
    txtEmail: (page: Page) => page.getByRole('textbox', { name: 'Email for Order Confirmation*' }),
    txtAddress1: (page: Page) => page.getByRole('textbox', { name: 'Address 1*' }),
    txtZipcode: (page: Page) => page.getByRole('textbox', { name: 'ZIP Code' }),
    txtCity: (page: Page) => page.getByRole('textbox', { name: 'City' }),
    stateDropdown: (page: Page) => page.getByRole('combobox', { name: 'State*' }),
    provinceDropdown: (page: Page) => page.getByRole('combobox', { name: 'Province*' }),
    continueBtn: (page: Page) => page.getByRole('button', { name: 'CONTINUE*' }),
    radCreditCard: (page: Page) => page.locator('#is-CREDIT_CARD'),

    inpFirstName:
        (page: Page) =>
            page.locator(
                '#dwfrm_singleshipping_shippingAddress_addressFields_firstName'
            ),

    inpLastName:
        (page: Page) =>
            page.locator(
                '#dwfrm_singleshipping_shippingAddress_addressFields_lastName'
            ),

    inpEmailForOrderConfirmation:
        (page: Page) =>
            page.locator(
                '#dwfrm_singleshipping_shippingAddress_email_emailAddress'
            ),

    inpAddress1:
        (page: Page) =>
            page.locator(
                '#dwfrm_singleshipping_shippingAddress_addressFields_address1'
            ),

    inpAddress2Optional:
        (page: Page) =>
            page.locator(
                '#dwfrm_singleshipping_shippingAddress_addressFields_address2'
            ),

    inpZIPCode:
        (page: Page) =>
            page.locator(
                '#dwfrm_singleshipping_shippingAddress_addressFields_postal'
            ),

    inpCity:
        (page: Page) =>
            page.locator(
                '#dwfrm_singleshipping_shippingAddress_addressFields_city'
            ),

    drpShippingCountry:
        (page: Page) =>
            page.locator(
                "//select[@name='dwfrm_singleshipping_shippingAddress_addressFields_country']"
            ),

    btnContinueShipping:
        (page: Page) =>
            page.locator(
                "//button[@id='form-submit']//span[text()='Continue']"
            ),

    lblCreditCard:
        (page: Page) =>
            page.locator(
                "label[for='is-CREDIT_CARD']"
            ),

    lblContinue:
        (page: Page) =>
            page.locator(
                "//span[text()='Continue']"
            ),

    cardFrame,

    inpNameOnCard: (page: Page) =>
        cardFrame(page)
            .getByRole(
                'textbox',
                {
                    name: 'Enter name on card'
                }
            ),

    inpCardNumber: (page: Page) =>
        cardFrame(page)
            .getByRole(
                'textbox',
                {
                    name: 'Enter card number'
                }
            ),

    drpCardExpirationMonth: (page: Page) =>
        cardFrame(page)
            .getByRole(
                'combobox',
                {
                    name: 'Select month'
                }
            ),

    drpCardExpirationYear: (page: Page) =>
        cardFrame(page)
            .getByRole(
                'combobox',
                {
                    name: 'Select year'
                }
            ),

    inpCardSecurityNumber: (page: Page) =>
        cardFrame(page)
            .getByRole(
                'textbox',
                {
                    name: 'Enter security code'
                }
            ),

    inptCardSecurityNumberRegUser: (page: Page) =>
        page.locator('#dwfrm_billing_paymentMethods_comenityCard_cvn'),

    lblPlaceOrder: (page: Page) =>
        page.locator("//button[@name='submit' and @type='submit' and normalize-space()='Place Order']"),

    drpState: (page: Page) =>
        page.getByRole('combobox', { name: 'State*' }),

    inpPhoneNumber: (page: Page) => page.getByRole('textbox', { name: 'Phone' }),
    btnContinueBilling: (page: Page) => page.getByRole('button', { name: 'Continue for billing', exact: true}),


};

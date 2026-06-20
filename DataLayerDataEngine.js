import { th } from '@faker-js/faker';
import DataUtils from '../../test-data/DataUtils.js';
const dataFakers = require('../Datafakers.ts');
 
const filePath = './test-data/DataLayerRepository.xlsx';
const sheetName = 'DataLayerTestData';
 
const dataUtils = new DataUtils();
 
/**
 * Handles test data retrieval and dynamic
 * test data generation for DataLayer validation.
 *
 * Responsibilities:
 * - Read test data from Excel
 * - Generate dynamic faker data
 * - Provide reusable getters for test execution
 */
export class DataLayerDataEngine {
 
    /**
     * Initializes DataLayerDataEngine.
     */
    constructor() {
 
        this.data = {};
 
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.addressLineOne = '';
        this.city = '';
        this.zipCode = '';
        this.phoneNumber = '';
        this.state = '';
    }
 
    /**
     * Creates and initializes DataLayerDataEngine
     * for the given test case ID.
     *
     * @param testcaseID - Test case identifier from Excel
     *
     * @returns Initialized DataLayerDataEngine instance
     */
    static async create(testcaseID) {
 
        const instance = new DataLayerDataEngine();
 
        await instance.fetchData(
            testcaseID,
            sheetName,
            filePath
        );
 
        return instance;
    }
 
    /**
     * Reads test data from Excel and initializes
     * dynamic test data values.
     *
     * @param testcaseID - Test case identifier
     * @param sheetName - Excel sheet name
     * @param filePath - Excel file path
     *
     * @returns Promise<void>
     */
    async fetchData(testcaseID, sheetName, filePath) {
 
        this.data = await dataUtils.readTCIDData(
            testcaseID,
            sheetName,
            filePath
        );
 
        this.firstName = this.setFirstName();
        this.lastName = this.setLastName();
        this.email = this.setEmail();
        this.addressLineOne = this.setAddressLineOne();
        this.city = this.setCity();
        this.zipCode = this.setZipCode();
        this.phoneNumber = this.setPhoneNumber();
        this.state = this.setState();
    }
 
    /**
     * Checks whether the provided value should be treated
     * as empty or dynamically generated.
     *
     * Supported dynamic indicators:
     * - undefined
     * - null
     * - empty string
     * - X
     *
     * @param value - Input test data value
     *
     * @returns True if dynamic value generation is required
     */
    isEmptyOrDynamic(value) {
 
        return value === undefined ||
            value === null ||
            String(value).trim().length === 0 ||
            String(value).trim().toUpperCase() === 'X';
    }
 
    /**
     * Returns first name from Excel or generates faker data.
     *
     * @returns First name
     */
    setFirstName() {
 
        return this.isEmptyOrDynamic(this.data.FirstName)
            ? dataFakers.firstName()
            : this.data.FirstName;
    }
 
    /**
     * Returns last name from Excel or generates faker data.
     *
     * @returns Last name
     */
    setLastName() {
 
        return this.isEmptyOrDynamic(this.data.LastName)
            ? dataFakers.lastName()
            : this.data.LastName;
    }
 
    /**
     * Returns email from Excel or generates faker data.
     *
     * @returns Email address
     */
    setEmail() {
 
        return this.isEmptyOrDynamic(this.data.Email)
            ? dataFakers.email()
            : this.data.Email;
    }
 
    /**
     * Returns address line one from Excel
     * or generates faker data.
     *
     * @returns Address line one
     */
    setAddressLineOne() {
 
        return this.isEmptyOrDynamic(this.data.AddressLineOne)
            ? dataFakers.addressLineOne()
            : this.data.AddressLineOne;
    }
 
    /**
     * Returns city from Excel or generates faker data.
     *
     * @returns City name
     */
    setCity() {
 
        return this.isEmptyOrDynamic(this.data.City)
            ? dataFakers.city()
            : this.data.City;
    }
 
    /**
     * Returns zip code from Excel or generates faker data.
     *
     * @returns Zip code
     */
    setZipCode() {
 
        return this.isEmptyOrDynamic(this.data.ZipCode)
            ? dataFakers.zipCode()
            : this.data.ZipCode;
    }
 
    /**
     * Returns phone number from Excel or generates faker data.
     *
     * @returns Phone number
     */
    setPhoneNumber() {
 
        return this.isEmptyOrDynamic(this.data.PhoneNumber)
            ? dataFakers.phoneNumber()
            : this.data.PhoneNumber;
    }
    /**
     * Returns state from Excel or generates faker data.
     *
     * @returns State name
     */
    setState() {
 
        return this.isEmptyOrDynamic(this.data.State)
            ? dataFakers.state()
            : this.data.State;
    }
 
    /**
     * Returns test case ID.
     */
    get testCaseId() {
 
        return this.data.TestCaseId ?? '';
    }
 
    /**
     * Returns test scenario name.
     */
    get scenario() {
 
        return this.data.Scenario ?? '';
    }
 
    /**
     * Returns user type.
     */
    get userType() {
 
        return this.data.UserType ?? '';
    }
 
    /**
     * Returns category name.
     */
    get categoryName() {
 
        return this.data.CategoryName ?? '';
    }
 
    /**
     * Returns search keyword.
     */
    get searchKeyword() {
 
        return this.data.SearchKeyword ?? '';
    }
 
    /**
     * Returns promo code.
     */
    get promoCode() {
 
        return this.data.PromoCode ?? '';
    }
 
    /**
     * Returns registered user flag.
     */
    get isRegisteredUser() {
 
        return String(this.data.IsRegisteredUser ?? '').toUpperCase() === 'Y';
    }
 
    /**
     * Returns product name.
     */
    get productName() {
 
        return this.data.ProductName ?? '';
    }
 
    /**
     * Returns product size.
     */
    get size() {
 
        return this.data.Size ?? '';
    }
 
    /**
     * Returns product color.
     */
    get color() {
 
        return this.data.Color ?? '';
    }
 
    /**
     * Returns product quantity.
     */
    get quantity() {
 
        return String(this.data.Quantity ?? '1');
    }
 
    /**
     * Returns payment type.
     */
    get paymentType() {
 
        return this.data.PaymentType ?? '';
    }
 
    /**
     * Returns shipping type.
     */
    get shippingType() {
 
        return this.data.ShippingType ?? '';
    }
 
     /**
     * Returns password.
     */
    get password() {
 
        return this.data.Password ?? '';
    }
   
}

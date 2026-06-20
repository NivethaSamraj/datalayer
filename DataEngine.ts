import DataUtils from '../test-data/DataUtils';

const dataFakers = require('./Datafakers.ts');

const filePath = './test-data/Sample_DataEngine.xlsx';

const datautils = new DataUtils();

/**
 * DataEngine provides helpers to load and prepare test data from Excel sheets.
 *
 * Usage:
 * - `DataEngine.create(testcaseID, sheetName)` to fetch a single row
 * - `DataEngine.getAllData(testcaseID, sheetName)` for data-driven runs
 */
export class DataEngine {

    data!: any;

    userName!: string;
    userEmail!: string;
    userAddress!: string;

    // Single row fetch
    /**
     * Create a DataEngine instance using a single testcase row.
     * @param testcaseID - Test case identifier to lookup in the sheet
     * @param sheetName - Sheet name within the Excel file
     */
    static async create(
        testcaseID: string,
        sheetName: string
    ) {

        const instance = new DataEngine();

        await instance.fetchData(
            testcaseID,
            sheetName,
            filePath
        );

        return instance;
    }

    // Multiple rows fetch for Data Driven Execution
    /**
     * Fetch all matching rows for a testcase id (data-driven execution).
     * @param testcaseID - Test case identifier
     * @param sheetName - Excel sheet name
     * @returns Promise<DataEngine[]>
     */
    static async getAllData(
        testcaseID: string,
        sheetName: string
    ) {

        // Read all excel data
        const allData = await datautils.readAllData(
            sheetName,
            filePath
        );

        // Filter matching TC IDs
        const matchedData = allData.filter(
            (row: any) => row.TC_ID === testcaseID
        );

        const dataInstances: DataEngine[] = [];

        for (const row of matchedData) {

            const instance = new DataEngine();

            // Reuse common method
            instance.prepareData(row);

            dataInstances.push(instance);
        }

        return dataInstances;
    }

    // Fetch single row data
    /**
     * Populate this instance from the provided testcase row in the workbook.
     */
    async fetchData(
        testcaseID: string,
        sheetName: string,
        filePath: string
    ) {

        const rowData = await datautils.readTCIDData(
            testcaseID,
            sheetName,
            filePath
        );

        // Reuse common preparation method
        this.prepareData(rowData);
    }

    /**
     * Prepare and normalize row data into instance properties.
     * @param rowData - Raw row object returned by `DataUtils`
     */
    prepareData(rowData: any) {

        this.data = rowData;

        this.userName = this.setuserName();
        this.userEmail = this.setuserEmail();
        this.userAddress = this.setuserAddress();
    }

    /**
     * Resolve or generate a username value for the instance.
     */
    setuserName() {

        return this.data.USER_NAME === 'X' ||
            this.data.USER_NAME?.length === 0
            ? dataFakers.fullName()
            : this.data.USER_NAME;
    }

    /**
     * Resolve or generate an email value for the instance.
     */
    setuserEmail() {

        return this.data.USER_EMAIL === 'X' ||
            this.data.USER_EMAIL?.length === 0
            ? dataFakers.email()
            : this.data.USER_EMAIL;
    }

    /**
     * Resolve or generate a current address for the instance.
     */
    setuserAddress() {

        return this.data.USER_CURRENT_ADDRESS === 'X' ||
            this.data.USER_CURRENT_ADDRESS?.length === 0
            ? dataFakers.fullAddress()
            : this.data.USER_CURRENT_ADDRESS;
    }
}

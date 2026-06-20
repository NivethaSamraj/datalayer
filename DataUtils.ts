import * as XLSX from "xlsx";

type RowData = Record<string, any>;

/**
 * Utility for reading and writing Excel test data using `xlsx`.
 *
 * Provides helpers to read sheets, fetch rows by Test ID and write back
 * generated values such as policy numbers.
 */
export default class DataUtils {

  async readData(filePath: string): Promise<RowData[]> {
    return this.readAllData("Sample", filePath);
  }

  async readAllData(
    sheetName: string,
    filePath: string
  ): Promise<RowData[]> {

    const workbook = XLSX.readFile(filePath);

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      throw new Error(`Sheet '${sheetName}' not found`);
    }

    return XLSX.utils.sheet_to_json<RowData>(worksheet, {
      defval: ""
    });

    /**
     * Read a single test row by common Test ID fields.
     * @param testid - Test ID to search for
     * @param sheetName - Sheet name
     * @param filePath - Excel file path
     */
  }

  async readRowCount(
    sheetName: string,
    filePath: string
  ): Promise<number> {

    const data = await this.readAllData(
      sheetName,
      filePath
    );

    return data.length;
  }

  async readTCIDData(
    testid: string,
    sheetName: string,
    filePath: string
  ): Promise<RowData> {

    const data = await this.readAllData(
      sheetName,
      filePath
    );

    const row = data.find(
      record =>
        record.TC_ID === testid ||
        record.TestID === testid ||
        record.testid === testid
    );

    if (!row) {
      throw new Error(
        `Test ID '${testid}' not found`
      );
    }

    return row;
  }

  async readSheetTCIDData(
    testid: string,
    sheetName: string,
    filePath: string
  ): Promise<RowData> {

    return this.readTCIDData(
      testid,
      sheetName,
      filePath
    );
  }

  async writeDataToExcel(
    sheetName: string,
    filePath: string,
    policyNumberList: string[]
  ): Promise<void> {

    const workbook = XLSX.readFile(filePath);

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      throw new Error(
        `Sheet '${sheetName}' not found`
      );
    }

    const sheetData: any[][] =
      XLSX.utils.sheet_to_json(worksheet, {
        header: 1
      });

    let foundData = false;
    let policyIndex = 0;

    for (let rowIndex = 1; rowIndex < sheetData.length; rowIndex++) {

      const row = sheetData[rowIndex];

      if (
        row &&
        row[0] !== undefined &&
        row[0] !== null &&
        row[0] !== ""
      ) {

        foundData = true;

        if (policyIndex < policyNumberList.length) {
          row[1] = policyNumberList[policyIndex];
          policyIndex++;
        }

      } else if (foundData) {
        break;
      }
    }

    workbook.Sheets[sheetName] =
      XLSX.utils.aoa_to_sheet(sheetData);

    XLSX.writeFile(
      workbook,
      filePath
    );
  }
}

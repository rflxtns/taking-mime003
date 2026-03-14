function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const name = data.name || '';
    const email = data.email || '';
    const code = data.code || '';
    const pid = data.pid || '';
    const isValidCode = data.isValidGuestList || false;

    // Check if this code was already redeemed
    let alreadyRedeemed = false;
    let redeemedByName = '';

    if (isValidCode && code !== 'none') {
      const allData = sheet.getDataRange().getValues();

      // Check all rows (skip header)
      for (let i = 1; i < allData.length; i++) {
        const rowCode = allData[i][3]; // Column D (code)
        const rowName = allData[i][1]; // Column B (name)
        const rowIsValid = allData[i][5]; // Column F (isValidGuestList)

        if (rowCode === code && rowIsValid === 'true') {
          alreadyRedeemed = true;
          redeemedByName = rowName;
          break;
        }
      }
    }

    // Add the submission to the sheet
    sheet.appendRow([
      new Date(),
      name,
      email,
      code,
      pid,
      isValidCode ? 'true' : 'false'
    ]);

    // Return response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      alreadyRedeemed: alreadyRedeemed,
      redeemedByName: redeemedByName,
      isValidCode: isValidCode
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

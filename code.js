function convertToCSV() {
    const excelFile = document.getElementById("excelFile").files[0];
    const fileReader = new FileReader();
  
    fileReader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const csvData = XLSX.utils.sheet_to_csv(worksheet);
  
      downloadCSV(csvData, "converted.csv");
    };
  
    fileReader.readAsArrayBuffer(excelFile);
  }
  

  function downloadCSV(csvData, fileName) {
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
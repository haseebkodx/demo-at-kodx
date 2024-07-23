const showPdf = (blob, loadingModalHandler) => {
    const newBlob = new Blob([blob], {type: "application/pdf"})

    if(window.navigator && window.navigator.msSaveOrOpenBlob) {
        //FOR IE BROWSERS
        window.navigator.msSaveOrOpenBlob(newBlob);
        loadingModalHandler && loadingModalHandler(false)
    }
    else {
        //FOR NON-IE BROWSERS
        const url = window.URL.createObjectURL(newBlob);

        //NOTE: KEEPING THIS COMMENTED FOR NOW IN CASE WE MAY NEED USE FOR IT.
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = `${pdfFileName}.pdf`
        // link.click();

        const win = window.open(url,'_blank')
        win.onload = function(){ 
            loadingModalHandler && loadingModalHandler(false) 
            setTimeout(function(){
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(url);
            }, 100);
        }
    }
}

export default showPdf
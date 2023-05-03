const targetPage = "*://manaba.tsukuba.ac.jp/*";

browser.webRequest.onHeadersReceived.addListener(
    (e) => {
        let isPdf = false;
        e.responseHeaders.forEach((header) => {
            const headerName = header.name.toLowerCase();

            if (headerName == "content-type") {
                isPdf = header.value === "application/pdf";
            }

            if (headerName == "content-disposition")
                header.value = header.value.replace("attachment", "inline");
        });


        if (isPdf) {
            return {responseHeaders: e.responseHeaders};
        } else {
            return;
        }
    },
    {urls: [targetPage]},
    ["blocking", "responseHeaders"]
);

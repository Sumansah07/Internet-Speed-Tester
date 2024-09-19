document.getElementById('startTest').addEventListener('click', async () => {
    const resultsDiv = document.getElementById('results');
    
    // Measure download speed
    const startDownloadTime = Date.now();
    const downloadResponse = await fetch('/download');
    const downloadSize = parseInt(downloadResponse.headers.get('Content-Length'), 10);
    await downloadResponse.blob();
    const endDownloadTime = Date.now();
    const downloadTime = (endDownloadTime - startDownloadTime) / 1000;
    const downloadSpeed = (downloadSize / (1024 * 1024)) / downloadTime;

    // Measure upload speed
    const fileToUpload = new Blob([new Uint8Array(10 * 1024 * 1024)]); // 10 MB
    const startUploadTime = Date.now();
    await fetch('/upload', {
        method: 'POST',
        body: fileToUpload
    });
    const endUploadTime = Date.now();
    const uploadTime = (endUploadTime - startUploadTime) / 1000;
    const uploadSpeed = (fileToUpload.size / (1024 * 1024)) / uploadTime;

    resultsDiv.innerHTML = `
        <p>Download Speed: ${downloadSpeed.toFixed(2)} MB/s</p>
        <p>Upload Speed: ${uploadSpeed.toFixed(2)} MB/s</p>
    `;
});

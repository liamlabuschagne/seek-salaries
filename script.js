var url = "URL_GOES_HERE";
var urlWithoutPage = url.replace(/&page=\d+/, "");

async function getJobs() {
  const response = await fetch(url);
  const firstPage = await response.json();
  let pageCount = firstPage.totalPages;
  let jobs = [];
  for (let i = 0; i <= pageCount; i++) {
    const response = await fetch(urlWithoutPage + "&page=" + i);
    const data = await response.json();
    jobs = jobs.concat(data.data);
  }
  return jobs;
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
download("jobs.json", JSON.stringify(await getJobs()));

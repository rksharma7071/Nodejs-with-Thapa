const fetchShortenedURL = async () => {
  try {
    const response = await fetch("/links");

    if (!response.ok) {
      throw new Error("Failed to fetch shortened URLs");
    }

    const links = await response.json();
    console.log("Links:", links);

    const list = document.getElementById("shortend-urls");
    list.innerHTML = "";

    for (const [shortCode, url] of Object.entries(links)) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="/${shortCode}" target="_blank">${window.location.origin}/${shortCode}</a> - ${url}`;
      list.appendChild(li);
    }

  } catch (error) {
    console.error("Error fetching links:", error);
  }
};

document
  .getElementById("shorten-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const url = formData.get("url");
    const shortCode = formData.get("shortCode");

    console.log(url, shortCode);
    try {
      const response = await fetch("/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shortCode }),
      });
      if (response.ok) {
        fetchShortenedURL();
        alert("Form submitte successfully!");
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      alert(error);
    }
  });

fetchShortenedURL();

document.addEventListener("DOMContentLoaded", () => {
  let pageReloaded = false; // Flag to track if page has been reloaded

  const menuItems = {
    "menuItems-ds": "Data_Science",
    "menuItems-da": "Data_Analytics",
    "menuItems-ai": "Artificial_Intelligence",
    "menuItems-ml": "Machine_Learning",
    "menuItems-dl": "Deep_Learning",
    "menuItems-fd": "Fraud_Detection",
    "menuItems-security": "Security",
    "menuItems-na": "Network_Analysis",
    "menuItems-hi": "Health_Intelligence",
    "menuItems-design": "Design",
    "menuItems-development": "Development",
  };

  const fetchDataAndUpdateContent = async (section) => {
    try {
      const res = await fetch("./assets/json/whatwedoData.json");
      const data = await res.json();
      const sectionData = data.find((item) => item[section])[section];

      // Update banner
      document.querySelector("#banner-data").innerHTML = `
        <span class='subhead'>${sectionData.banner[0].bannerSubhead}</span>
        <h2>${sectionData.banner[0].heading}</h2>
        <h6>${sectionData.banner[0].description}</h6>
      `;

      // Update banner image
      document.querySelector(".whatwedo-banner-image").innerHTML = `
        <img src="${sectionData.bannerImage}" alt="banner image" />
      `;

      if (sectionData.application) {
        // Update content left
        const leftData = sectionData.application.leftData;
        document.querySelector(".content-left").innerHTML = `
          <span class='subhead blue'>${leftData.subhead}</span>
          <h3>${leftData.heading}</h3>
          <p>${leftData.description}</p>
        `;

        // Update values wrapper
        if (sectionData.application.servicesBoxes) {
          const servicesBoxes = sectionData.application.servicesBoxes;
          document.querySelector(".values-wrapper").innerHTML = servicesBoxes
            .map(
              (serviceBox) => `
                <div class="our-services-box">
                  <img src="${serviceBox.serviceImage}" alt="Service Image">
                  <p>${serviceBox.serviceHead}</p>
                  <span>${serviceBox.serviceDescription}</span>
                </div>
              `
            )
            .join("");
        }
      }

      if (sectionData.process) {
        const header = sectionData.process.header;
        document.querySelector(".heading-data").innerHTML = `
          <span class='subhead blue'>${header.subheading}</span>
          <h3>${header.heading}</h3>
          <h5>${header.content}</h5>
        `;
        if (sectionData.process.processBoxes) {
          const processBoxes = sectionData.process.processBoxes;
          document.querySelector(".process-wrapper").innerHTML = processBoxes
            .map(
              (processBox) => `
                <div class="processes-box">
                  <img src="${processBox.processImage}" alt="Process Image">
                  <p>${processBox.processHead}</p>
                  <span>${processBox.processData}</span>
                </div>
              `
            )
            .join("");
        }
      }
    } catch (error) {
      console.error("Error loading JSON file", error);
    }
  };

  Object.keys(menuItems).forEach((menuId) => {
    document.getElementById(menuId).addEventListener("click", (event) => {
      event.preventDefault();
      const section = menuItems[menuId];
      history.pushState(null, "", `./what-we-do.html#${section}`);
      fetchDataAndUpdateContent(section);

      // Reload the page if it hasn't been reloaded already
      if (!pageReloaded && location.href.includes("what-we-do.html")) {
        pageReloaded = true;
        setTimeout(() => {
          location.reload();
        }, 20);
      }
    });
  });

  const updateContentFromUrl = () => {
    const section = location.hash.replace("#", "") || "Data_Science"; // Default section
    fetchDataAndUpdateContent(section);
  };

  window.addEventListener("popstate", updateContentFromUrl);
  updateContentFromUrl();
});
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = {
    "menuItems-ds": "Data Science",
    "menuItems-da": "Data Analytics",
    "menuItems-ai": "Artificial Intelligence",
    "menuItems-ml": "Machine Learning",
    "menuItems-dl": "Deep Learning",
    "menuItems-fd": "Fraud Detection",
    "menuItems-security": "Security",
    "menuItems-na": "Network Analysis",
    "menuItems-hi": "Health Intelligence",
    "menuItems-design": "Design",
    "menuItems-development": "Development",
  };

  const fetchDataAndUpdateContent = (section) => {
    fetch("./assets/js/script.js")
      .then((res) => res.json())
      .then((data) => {
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
      })
      .catch((error) => console.error("Error loading JSON file", error));
  };

  // Ensure the dropdown menu block is displayed
  document.getElementById("dropdown-menu").style.display = "block";

  Object.keys(menuItems).forEach((menuId) => {
    document.getElementById(menuId).addEventListener("click", (event) => {
      event.preventDefault();
      const section = menuItems[menuId];
      fetchDataAndUpdateContent(section);
      history.pushState(null, "", `#${section}`);
    });
  });

  const updateContentFromUrl = () => {
    const section = location.hash.replace("#", "") || "Data Science"; // Default section
    fetchDataAndUpdateContent(section);
  };

  window.addEventListener("popstate", updateContentFromUrl);
  updateContentFromUrl();
});

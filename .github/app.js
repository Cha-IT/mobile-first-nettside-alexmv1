document.addEventListener("DOMContentLoaded", () => {
  const menuList = document.getElementById("menu-list");
  const orderList = document.getElementById("order-list");
  const submitOrderButton = document.getElementById("submit-order");
  const contactForm = document.getElementById("contact-form");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const closeModalButton = document.getElementById("close-modal");

  // Load menu from JSON
  fetch("menu.json")
    .then(response => response.json())
    .then(menu => {
      menu.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${item.image}" alt="${item.name}" width="100">
          <h3>${item.name}</h3>
          <p>Pris: ${item.price} kr</p>
          <button class="add-to-order">Legg til</button>
        `;
        li.querySelector(".add-to-order").addEventListener("click", () => {
          const orderItem = document.createElement("li");
          orderItem.textContent = `${item.name} - ${item.price} kr`;
          orderList.appendChild(orderItem);
        });
        menuList.appendChild(li);
      });
    });

  const showModal = (message) => {
    modalMessage.textContent = message;
    modal.classList.remove("hidden");
  };

  closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Handle order submission
  submitOrderButton.addEventListener("click", () => {
    if (orderList.children.length === 0) {
      showModal("Bestillingslisten er tom!");
    } else {
      showModal("Bestillingen din er sendt!");
      orderList.innerHTML = "";
    }
  });

  // Validate and handle contact form submission
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    if (!name || !phone) {
      showModal("Vennligst fyll ut navn og telefonnummer.");
    } else {
      showModal("Meldingen din er sendt!");
      contactForm.reset();
    }
  });
});

document.getElementById('orderForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // Ortama göre backend URL'si
  const backendURL = ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? "http://localhost:3000"
    : "https://senin-canli-api-adresin.com";

  try {
    const response = await fetch(`${backendURL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Sipariş gönderildi!");
      e.target.reset();
      displaySingleOrder(data); // sadece o anki siparişi göster
    } else {
      alert("Sunucu hatası oluştu.");
    }
  } catch (error) {
    console.error("İstek hatası:", error);
    alert("Bağlantı kurulamadı.");
  }
});

// Sadece son siparişi gösteren fonksiyon
function displaySingleOrder(order) {
  const listElement = document.getElementById("orderList");
  listElement.innerHTML = ""; // Önceki siparişleri temizle

  const li = document.createElement("li");
  li.textContent = `${order.name} - ${order.type} (${order.size})${order.note ? ' | Not: ' + order.note : ''}`;
  listElement.appendChild(li);
}

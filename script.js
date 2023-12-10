function kirimPesan() {
  // Mendapatkan nilai input dari formulir
  var nama = document.getElementById("nama").value;
  var pesan = document.getElementById("pesan").value;

  // Validasi input (Anda dapat menambahkan validasi lebih lanjut)
  if (!nama || !pesan) {
    alert("Nama dan pesan harus diisi!");
    return;
  }

  // Proses pengiriman pesan (gantilah dengan logika sesuai kebutuhan Anda)
  console.log("Pesan dari " + nama + ": " + pesan);

  // Reset formulir setelah mengirim pesan
  document.getElementById("nama").value = "";
  document.getElementById("pesan").value = "";

  // Tambahkan logika untuk menampilkan pesan langsung atau perbarui daftar ucapan jika perlu
}

const renderCard = (data) => {
  const card = document.createElement("div");
  card.className = "card mb-3";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Menambahkan Nama dan Isi Teks ke Card
  const nameElement = document.createElement("h5");
  nameElement.className = "card-title";
  nameElement.innerText = data.name; // Ganti dengan properti yang sesuai
  cardBody.appendChild(nameElement);

  const textElement = document.createElement("p");
  textElement.className = "card-text";
  textElement.innerText = data.text; // Ganti dengan properti yang sesuai
  cardBody.appendChild(textElement);

  card.appendChild(cardBody);

  return card;
};

const updateView = (data) => {
  const daftarUcapan = document.getElementById("daftar-ucapan");

  // Menghapus konten sebelumnya
  daftarUcapan.innerHTML = "";

  if (data.length === 0) {
    // Tampilkan pesan jika tidak ada data
    daftarUcapan.innerHTML = `<div class="h6 text-center">Tidak ada data</div>`;
  } else {
    // Render setiap kartu dan tambahkan ke daftar ucapan
    data.forEach((data) => {
      const card = renderCard(data);
      daftarUcapan.appendChild(card);
    });
  }
};

// Fungsi untuk mengirim pesan
const kirimPesan = async () => {
  const nama = document.getElementById("nama").value;
  const pesan = document.getElementById("pesan").value;

  // Kirim data ke server
  await request("POST", "/api/comment")
    .token(token)
    .body({ name: nama, text: pesan })
    .then((res) => {
      if (res.code === 200) {
        // Jika pengiriman berhasil, perbarui tampilan
        updateView(res.data);
      } else {
        alert(`Terdapat kesalahan: ${res.message}`);
      }
    })
    .catch((err) => alert(`Terdapat kesalahan: ${err}`));
};

document.addEventListener("DOMContentLoaded", () => {
  // Panggil fungsi setelah halaman dimuat
  const tombol = document.querySelector("#tombolKirim");
  tombol.addEventListener("click", kirimPesan);
});

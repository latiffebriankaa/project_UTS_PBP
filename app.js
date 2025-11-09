function kelolaLahanPerkebunan(lahan, DataCuaca) {
  const lahanAwal = JSON.parse(JSON.stringify(lahan));
  
  for (let i = 0; i < lahan.length; i++) { // aturan a
    let baris = lahan[i];
    let totalPetak = baris.length;
    let petakSubur = 0;
    for (let j = 0; j < totalPetak; j++) {// hitung petak subur di baris
      if (baris[j] === "subur") {
        petakSubur++;
      }
    }
    
    if (petakSubur / totalPetak < 0.5) { // jika kurang dari 50%, petak subur diubah menjadi "kering"
      for (let j = 0; j < totalPetak; j++) {
        if (baris[j] === "subur") {
          baris[j] = "kering";
        }
      }
    }
  }

  let totalPetakSubur = 0; // aturan e
  for (let i = 0; i < lahan.length; i++) {
    for (let j = 0; j < lahan[i].length; j++) {
      if (lahan[i][j] === "subur") {
        totalPetakSubur++;
      }
    }
  }

  const cuacaCocok = // aturan c
    DataCuaca.temperature >= 20 &&
    DataCuaca.temperature <= 30 &&
    DataCuaca.humidity > 50 &&
    DataCuaca.windSpeed < 15;

  let totalDitanami = 0; // menentukan jumlah petak yang akan ditanami sesuai kondisi cuaca
  if (cuacaCocok) {
    totalDitanami = totalPetakSubur;
  }

  console.log(`kondisi lahan`);
  for (let i = 0; i < lahan.length; i++) {
    console.log(`Baris ${i+1}:[${lahan[i].join(", ")}]`);
  }
  
  // Tampilkan baris yang mengalami perubahan
  console.log(`\nBaris lahan yang mengalami perubahan:`);
  let adaPerubahan = false;
  for (let i = 0; i < lahan.length; i++) {
    let berubah = false;
    for (let j = 0; j < lahan[i].length; j++) {
      if (lahanAwal[i][j] !== lahan[i][j]) {
        berubah = true;
        break;
      }
    }
    if (berubah) {
      console.log(`- Baris ${i+1}`);
      adaPerubahan = true;
    }
  }
  
  if (!adaPerubahan) {
    console.log(`- Tidak ada baris yang berubah`);
  }
  
  console.log(`\nkondisi cuaca`);
  console.log(`-suhu : ${DataCuaca.temperature}`);
  console.log(`-kelembapan : ${DataCuaca.humidity}`);
  console.log(`-kecepatan angin : ${DataCuaca.windSpeed}\n`);

  console.log(`Total petak yang subur: ${totalPetakSubur}`);
  console.log(`Total petak yang ditanami: ${totalDitanami}`);
  if (!cuacaCocok) {
    console.log("Cuaca tidak cocok untuk bercocok tanam");
  } else {
    console.log(
      "Cuaca cocok untuk bercocok tanam, sehingga tidak ada peringatan"
    );
  }
}

const lahan = [
  ["subur", "kering", "subur", "subur"],
  ["tandus", "kering", "kering", "subur"],
  ["subur", "subur", "subur", "kering"],
  ["subur", "kering", "kering", "kering"],
];
const DataCuaca = {
  temperature: 20,
  humidity: 68,
  windSpeed: 13,
};

kelolaLahanPerkebunan(lahan, DataCuaca);
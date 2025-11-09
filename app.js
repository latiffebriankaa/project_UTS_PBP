function kelolaLahanPerkebunan(lahan, weatherData) {
  /* 
aturan a : setiap baris lahan harus mengandung >= 50% petak "subur"
jika tidak, setiap petak "subur" di baris tersebut di ubah menjadi "kering"
*/
  for (let i = 0; i < lahan.length; i++) {
    let baris = lahan[i];
    let totalPetak = baris.length;
    let petakSubur = 0;

    for (let j = 0; j < totalPetak; j++) {
      if (baris[j] === "subur") {
        petakSubur++;
      }
    }

    if (petakSubur / totalPetak < 0.5) {
      for (let j = 0; j < totalPetak; j++) {
        if (baris[j] === "subur") {
          baris[j] = "kering";
        }
      }
    }
  }

  /*
  aturan e :
  hitung jumlah total petak "subur" setelah penerapan aturan baris
   */
  let totalPetakSubur = 0;
  for (let i = 0; i < lahan.length; i++) {
    for (let j = 0; j < lahan[i].length; j++) {
      if (lahan[i][j] === "subur") {
        totalPetakSubur++;
      }
    }
  }

  // aturan c: Cek kondisi cuaca ideal untuk bercocok tanam
  const suhuIdeal =
    weatherData.temperature >= 20 && weatherData.temperature <= 30;
  const kelembapanIdeal = weatherData.humidity > 50;
  const anginIdeal = weatherData.windSpeed < 15;

  const cuacaCocok = suhuIdeal && kelembapanIdeal && anginIdeal;

  // Tentukan jumlah petak yang akan ditanami berdasarkan kondisi cuaca
  let totalDitanami = cuacaCocok ? totalPetakSubur : 0;

  console.log(`Total petak subur: ${totalPetakSubur}`);
  console.log(`Total petak yang ditanami: ${totalDitanami}`);
  if (!cuacaCocok) {
    console.log("Cuaca tidak cocok untuk bercocok tanam");
  } else {
    console.log(
      "Cuaca cocok untuk bercocok tanam, sehingga tidak ada peringatan"
    );
  }
}

// Contoh penggunaan 
const lahan = [
  ["subur", "kering", "subur", "subur"],
  ["tandus", "kering", "kering", "subur"],
  ["subur", "subur", "subur", "kering"],
  ["kering", "kering", "kering", "kering"],
];

const weatherData = {
  temperature: 26,
  humidity: 59,
  windSpeed: 13,
};

kelolaLahanPerkebunan(lahan, weatherData);

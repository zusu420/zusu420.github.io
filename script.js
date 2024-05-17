function calculateBAC() {
    // Pobierz dane z formularza
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const alcoholVolume = parseFloat(document.getElementById('alcoholVolume').value);
    const alcoholPercentage = parseFloat(document.getElementById('alcoholPercentage').value);

    // Gęstość alkoholu etylowego
    const alcoholDensity = 0.79;

    // Oblicz ilość alkoholu w gramach
    const alcoholGrams = alcoholVolume * (alcoholPercentage / 100) * alcoholDensity;

    // Zawartość płynów ustrojowych w organizmie
    const bodyFluidPercentage = gender === 'male' ? 0.7 : 0.6;
    const bodyFluids = weight * bodyFluidPercentage;

    // Oblicz promile alkoholu we krwi
    const BAC = alcoholGrams / bodyFluids;

    // Szybkość eliminacji alkoholu (na podstawie danych z alkomatu)
    const eliminationRate = calculateEliminationRate();

    // Oblicz czas do wytrzeźwienia w godzinach
    const soberingTimeHours = BAC / eliminationRate;

    // Przelicz czas do wytrzeźwienia na godziny i minuty
    const soberingTimeHoursFloor = Math.floor(soberingTimeHours);
    const soberingTimeMinutes = Math.floor((soberingTimeHours - soberingTimeHoursFloor) * 60);

    // Wyświetl wyniki
    document.getElementById('alcoholGramsResult').innerText = `Łączna ilość alkoholu w gramach: ${alcoholGrams.toFixed(2)} g`;
    document.getElementById('bacResult').innerText = `Zawartość alkoholu we krwi: ${BAC.toFixed(2)}‰`;
    document.getElementById('soberingTimeResult').innerText = `Szacowany czas do wytrzeźwienia: ${soberingTimeHoursFloor} godzin i ${soberingTimeMinutes} minut`;
}

function calculateEliminationRate() {
    // Przykładowe wyniki z alkomatu
    const measurements = [
        { time: 40, bac: 0.65 },
        { time: 55, bac: 0.78 },
        { time: 70, bac: 0.85 },
        { time: 85, bac: 0.87 },
        { time: 100, bac: 0.87 },
        { time: 115, bac: 0.85 },
        { time: 130, bac: 0.78 },
        { time: 145, bac: 0.70 },
        { time: 160, bac: 0.61 },
        { time: 175, bac: 0.55 },
        { time: 190, bac: 0.48 },
        { time: 205, bac: 0.42 },
        { time: 220, bac: 0.36 },
        { time: 235, bac: 0.30 },
        { time: 250, bac: 0.23 },
        { time: 265, bac: 0.15 },
        { time: 280, bac: 0.00 }
    ];

    // Oblicz różnicę promili i czasu dla eliminacji alkoholu
    const start = measurements[5]; // np. 1:55 - 0,85
    const end = measurements[15]; // np. 4:25 - 0,15

    const bacDifference = start.bac - end.bac;
    const timeDifference = (end.time - start.time) / 60; // przelicz na godziny

    // Oblicz szybkość eliminacji
    const eliminationRate = bacDifference / timeDifference;

    return eliminationRate;
}

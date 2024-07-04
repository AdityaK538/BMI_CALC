function calculateBMI() {
  let heightIn = document.getElementById('height').value;
  let weightIn = document.getElementById('weight').value;

  if (!heightIn || !weightIn) {
    alert('Please enter both height and weight.');
    return;
  }

  let height = parseFloat(heightIn);
  let weight = parseFloat(weightIn);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    alert('Please enter valid height and weight.');
    return;
  }

  let heightInMeters = height / 100;
  let bmi = weight / (heightInMeters * heightInMeters);
  let bmiScore = calculateBMIScore(bmi);
  let bmiCategory = categorizeBMI(bmi);

  let expectedBMI = getExpectedBMI(height);

  // Store BMI data in local storage
  localStorage.setItem(
    'bmiData',
    JSON.stringify({
      height: height,
      weight: weight,
      bmi: bmi.toFixed(2),
      bmiCategory: bmiCategory,
      bmiScore: bmiScore,
    })
  );

  // Redirect to another page to display results
  window.location.href = 'result.html';
}

function getExpectedBMI(height) {
  let bmiRanges = {
    short: [18.5, 22.9],
    medium: [18.5, 24.9],
    tall: [18.5, 26.9],
  };

  let category;
  if (height < 160) {
    category = 'short';
  } else if (height >= 160 && height < 180) {
    category = 'medium';
  } else {
    category = 'tall';
  }

  return bmiRanges[category];
}

function calculateBMIScore(bmi) {
  if (bmi < 18.5) {
    return 10;
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 70;
  } else if (bmi >= 24.9 && bmi < 29.9) {
    return 40;
  } else {
    return 20;
  }
}

function categorizeBMI(bmi) {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal weight';
  } else if (bmi >= 24.9 && bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

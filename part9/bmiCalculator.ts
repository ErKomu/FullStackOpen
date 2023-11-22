interface BmiResult {
    bmi: number;
    message: string;
}

export const calculateBmi = (height: number, weight: number): BmiResult => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);

    let message = '';
    if (bmi < 18.5) {
        message = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        message = 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        message = 'Overweight';
    } else {
        message = 'Obese';
    }

    return { bmi, message };
};

const bmiArgs = process.argv.slice(2).map(Number);
console.log(bmiArgs);

if (bmiArgs.some(isNaN)) {
    console.error('Error: All inputs must be valid numbers.');
} else {
    const bmiResult = calculateBmi(bmiArgs[0], bmiArgs[1]);
    console.log(bmiResult.message);
}



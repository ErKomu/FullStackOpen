interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (
    dailyHours: number[],
    target: number
): ExerciseResult => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hours => hours > 0).length;
    const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength || 0;

    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average < target / 2) {
        rating = 1;
        ratingDescription = 'poor';
    } else if (average >= target / 2 && average < target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'excellent';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const exerciseArgs = process.argv.slice(2).map(Number);

if (exerciseArgs.some(isNaN)) {
    console.error('Error: All inputs must be valid numbers.');
} else {
    const exerciseResult = calculateExercises(exerciseArgs.slice(1), exerciseArgs[0]);
    console.log(exerciseResult);
}

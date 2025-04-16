import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { colors } from "@/constants/colors";
import { useFoodStore } from "@/store/food-store";
import { DailySummary } from "@/components/DailySummary";
import { MealSection } from "@/components/MealSection";
import { DateSelector } from "@/components/DateSelector";

export default function DashboardScreen() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { getDailyLog } = useFoodStore();

    // Format date as YYYY-MM-DD for store lookup
    const dateString = selectedDate.toISOString().split("T")[0];
    const dailyLog = getDailyLog(dateString);

    // Calculate total calories for each meal
    const calculateMealCalories = (
        mealType: "breakfast" | "lunch" | "dinner" | "snack"
    ) => {
        const { getFood } = useFoodStore();
        return dailyLog.meals[mealType].reduce((total, entry) => {
            const food = getFood(entry.foodId);
            if (food) {
                return total + food.calories * entry.quantity;
            }
            return total;
        }, 0);
    };

    const breakfastCalories = calculateMealCalories("breakfast");
    const lunchCalories = calculateMealCalories("lunch");
    const dinnerCalories = calculateMealCalories("dinner");
    const snackCalories = calculateMealCalories("snack");

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <DateSelector
                    date={selectedDate}
                    onDateChange={setSelectedDate}
                />

                <DailySummary />

                <MealSection
                    title="Breakfast"
                    mealType="breakfast"
                    entries={dailyLog.meals.breakfast}
                    totalCalories={breakfastCalories}
                />

                <MealSection
                    title="Lunch"
                    mealType="lunch"
                    entries={dailyLog.meals.lunch}
                    totalCalories={lunchCalories}
                />

                <MealSection
                    title="Dinner"
                    mealType="dinner"
                    entries={dailyLog.meals.dinner}
                    totalCalories={dinnerCalories}
                />

                <MealSection
                    title="Snacks"
                    mealType="snack"
                    entries={dailyLog.meals.snack}
                    totalCalories={snackCalories}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
});

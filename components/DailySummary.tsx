import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { NutritionProgressBar } from "./NutritionProgressBar";
import { useFoodStore } from "@/store/food-store";

export const DailySummary: React.FC = () => {
    const { getTodayLog, nutritionGoals } = useFoodStore();
    const todayLog = getTodayLog();

    const caloriesPercentage = Math.min(
        Math.round((todayLog.totalCalories / nutritionGoals.calories) * 100),
        100
    );

    return (
        <View style={styles.container}>
            <View style={styles.calorieContainer}>
                <View>
                    <Text style={styles.calorieLabel}>Calories</Text>
                    <View style={styles.calorieRow}>
                        <Text style={styles.calorieValue}>
                            {todayLog.totalCalories.toFixed(0)}
                        </Text>
                        <Text style={styles.calorieGoal}>
                            / {nutritionGoals.calories}
                        </Text>
                    </View>
                </View>
                <View style={styles.percentContainer}>
                    <Text style={styles.percentText}>
                        {caloriesPercentage}%
                    </Text>
                </View>
            </View>

            <View style={styles.progressContainer}>
                <NutritionProgressBar
                    label="Protein"
                    current={todayLog.totalProtein}
                    goal={nutritionGoals.protein}
                    color="#4A6FA5"
                />
                <NutritionProgressBar
                    label="Carbs"
                    current={todayLog.totalCarbs}
                    goal={nutritionGoals.carbs}
                    color="#F9A826"
                />
                <NutritionProgressBar
                    label="Fat"
                    current={todayLog.totalFat}
                    goal={nutritionGoals.fat}
                    color="#E57373"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    calorieContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    calorieLabel: {
        fontSize: 16,
        color: colors.textLight,
        marginBottom: 4,
    },
    calorieRow: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    calorieValue: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.text,
    },
    calorieGoal: {
        fontSize: 16,
        color: colors.textLight,
        marginLeft: 4,
    },
    percentContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    percentText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    progressContainer: {
        marginTop: 8,
    },
});

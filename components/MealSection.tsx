import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MealEntry, MealType } from "@/types/food";
import { colors } from "@/constants/colors";
import { useFoodStore } from "@/store/food-store";
import { ChevronRight, Plus } from "lucide-react-native";
import { useRouter } from "expo-router";

interface MealSectionProps {
    title: string;
    mealType: MealType;
    entries: MealEntry[];
    totalCalories: number;
}

export const MealSection: React.FC<MealSectionProps> = ({
    title,
    mealType,
    entries,
    totalCalories,
}) => {
    const router = useRouter();
    const { getFood, removeMealEntry } = useFoodStore();

    const handleAddFood = () => {
        router.push({
            pathname: "/food-search",
            params: { mealType },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.calories}>
                    {totalCalories.toFixed(0)} cal
                </Text>
            </View>

            {entries.length > 0 ? (
                <View style={styles.entriesContainer}>
                    {entries.map((entry) => {
                        const food = getFood(entry.foodId);
                        if (!food) return null;

                        return (
                            <View key={entry.id} style={styles.entryRow}>
                                <View style={styles.entryInfo}>
                                    <Text style={styles.foodName}>
                                        {food.name}
                                    </Text>
                                    <Text style={styles.servingInfo}>
                                        {entry.quantity} × {food.servingSize}
                                    </Text>
                                </View>
                                <Text style={styles.entryCalories}>
                                    {(food.calories * entry.quantity).toFixed(
                                        0
                                    )}{" "}
                                    cal
                                </Text>
                            </View>
                        );
                    })}
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No foods added yet</Text>
                </View>
            )}

            <Pressable
                style={({ pressed }) => [
                    styles.addButton,
                    pressed && styles.buttonPressed,
                ]}
                onPress={handleAddFood}
            >
                <Plus size={18} color={colors.primary} />
                <Text style={styles.addButtonText}>Add Food</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.text,
    },
    calories: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.primary,
    },
    entriesContainer: {
        marginBottom: 12,
    },
    entryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    entryInfo: {
        flex: 1,
    },
    foodName: {
        fontSize: 15,
        fontWeight: "500",
        color: colors.text,
    },
    servingInfo: {
        fontSize: 13,
        color: colors.textLight,
        marginTop: 2,
    },
    entryCalories: {
        fontSize: 15,
        fontWeight: "500",
        color: colors.textLight,
    },
    emptyContainer: {
        paddingVertical: 16,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 14,
        color: colors.textLight,
        fontStyle: "italic",
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: colors.background,
        marginTop: 8,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    addButtonText: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: "500",
        color: colors.primary,
    },
});

import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Food } from "@/types/food";
import { colors } from "@/constants/colors";
import { Plus } from "lucide-react-native";

interface FoodCardProps {
    food: Food;
    onPress: (food: Food) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}
            onPress={() => onPress(food)}
        >
            <Image
                source={{ uri: food.image }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <Text style={styles.name}>{food.name}</Text>
                <Text style={styles.serving}>{food.servingSize}</Text>
                <View style={styles.nutritionRow}>
                    <Text style={styles.calories}>{food.calories} cal</Text>
                    <View style={styles.macros}>
                        <Text style={styles.macro}>P: {food.protein}g</Text>
                        <Text style={styles.macro}>C: {food.carbs}g</Text>
                        <Text style={styles.macro}>F: {food.fat}g</Text>
                    </View>
                </View>
            </View>
            <View style={styles.addButton}>
                <Plus size={20} color={colors.primary} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: colors.card,
        borderRadius: 12,
        marginBottom: 12,
        padding: 12,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12,
    },
    content: {
        flex: 1,
        justifyContent: "space-between",
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 2,
    },
    serving: {
        fontSize: 13,
        color: colors.textLight,
        marginBottom: 4,
    },
    nutritionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    calories: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.primary,
    },
    macros: {
        flexDirection: "row",
        gap: 8,
    },
    macro: {
        fontSize: 13,
        color: colors.textLight,
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.background,
        alignSelf: "center",
    },
});

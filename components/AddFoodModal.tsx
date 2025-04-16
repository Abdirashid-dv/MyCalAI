import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Pressable,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { colors } from "@/constants/colors";
import { Food, MealType } from "@/types/food";
import { useFoodStore } from "@/store/food-store";
import { X, Minus, Plus } from "lucide-react-native";

interface AddFoodModalProps {
    visible: boolean;
    food: Food | null;
    mealType: MealType;
    onClose: () => void;
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({
    visible,
    food,
    mealType,
    onClose,
}) => {
    const [quantity, setQuantity] = useState(1);
    const { addMealEntry } = useFoodStore();

    if (!food) return null;

    const handleAddFood = () => {
        const today = new Date().toISOString().split("T")[0];

        addMealEntry({
            foodId: food.id,
            date: today,
            mealType,
            quantity,
        });

        onClose();
    };

    const decreaseQuantity = () => {
        if (quantity > 0.5) {
            setQuantity((prev) => Math.round((prev - 0.5) * 10) / 10);
        }
    };

    const increaseQuantity = () => {
        setQuantity((prev) => Math.round((prev + 0.5) * 10) / 10);
    };

    const totalCalories = Math.round(food.calories * quantity);
    const totalProtein = Math.round(food.protein * quantity * 10) / 10;
    const totalCarbs = Math.round(food.carbs * quantity * 10) / 10;
    const totalFat = Math.round(food.fat * quantity * 10) / 10;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContainer}
            >
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Add to {mealType}</Text>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <X size={24} color={colors.text} />
                        </Pressable>
                    </View>

                    <ScrollView style={styles.scrollContent}>
                        <Text style={styles.foodName}>{food.name}</Text>
                        <Text style={styles.servingSize}>
                            {food.servingSize}
                        </Text>

                        <View style={styles.quantityContainer}>
                            <Text style={styles.quantityLabel}>Quantity</Text>
                            <View style={styles.quantityControls}>
                                <Pressable
                                    onPress={decreaseQuantity}
                                    style={({ pressed }) => [
                                        styles.quantityButton,
                                        pressed && styles.buttonPressed,
                                    ]}
                                >
                                    <Minus size={20} color={colors.text} />
                                </Pressable>

                                <TextInput
                                    style={styles.quantityInput}
                                    value={quantity.toString()}
                                    onChangeText={(text) => {
                                        const value = parseFloat(text);
                                        if (!isNaN(value) && value > 0) {
                                            setQuantity(value);
                                        } else if (text === "") {
                                            setQuantity(0);
                                        }
                                    }}
                                    keyboardType="numeric"
                                />

                                <Pressable
                                    onPress={increaseQuantity}
                                    style={({ pressed }) => [
                                        styles.quantityButton,
                                        pressed && styles.buttonPressed,
                                    ]}
                                >
                                    <Plus size={20} color={colors.text} />
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.nutritionContainer}>
                            <Text style={styles.nutritionTitle}>
                                Nutrition Information
                            </Text>

                            <View style={styles.nutritionRow}>
                                <Text style={styles.nutritionLabel}>
                                    Calories
                                </Text>
                                <Text style={styles.nutritionValue}>
                                    {totalCalories} cal
                                </Text>
                            </View>

                            <View style={styles.nutritionRow}>
                                <Text style={styles.nutritionLabel}>
                                    Protein
                                </Text>
                                <Text style={styles.nutritionValue}>
                                    {totalProtein} g
                                </Text>
                            </View>

                            <View style={styles.nutritionRow}>
                                <Text style={styles.nutritionLabel}>Carbs</Text>
                                <Text style={styles.nutritionValue}>
                                    {totalCarbs} g
                                </Text>
                            </View>

                            <View style={styles.nutritionRow}>
                                <Text style={styles.nutritionLabel}>Fat</Text>
                                <Text style={styles.nutritionValue}>
                                    {totalFat} g
                                </Text>
                            </View>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={({ pressed }) => [
                            styles.addButton,
                            pressed && styles.addButtonPressed,
                        ]}
                        onPress={handleAddFood}
                    >
                        <Text style={styles.addButtonText}>Add to Diary</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === "ios" ? 40 : 20,
        maxHeight: "80%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.text,
    },
    closeButton: {
        padding: 4,
    },
    scrollContent: {
        marginTop: 16,
    },
    foodName: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 4,
    },
    servingSize: {
        fontSize: 16,
        color: colors.textLight,
        marginBottom: 24,
    },
    quantityContainer: {
        marginBottom: 24,
    },
    quantityLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 12,
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    quantityButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.card,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    quantityInput: {
        width: 80,
        height: 44,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        color: colors.text,
        marginHorizontal: 16,
    },
    nutritionContainer: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    nutritionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 12,
    },
    nutritionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    nutritionLabel: {
        fontSize: 15,
        color: colors.text,
    },
    nutritionValue: {
        fontSize: 15,
        fontWeight: "500",
        color: colors.text,
    },
    addButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 8,
    },
    addButtonPressed: {
        opacity: 0.9,
    },
    addButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});

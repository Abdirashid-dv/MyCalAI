import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
    Switch,
    SafeAreaView,
} from "react-native";
import { colors } from "@/constants/colors";
import { useFoodStore } from "@/store/food-store";
import {
    ChevronRight,
    Settings,
    User,
    Bell,
    Moon,
    Info,
} from "lucide-react-native";

export default function ProfileScreen() {
    const { nutritionGoals, updateNutritionGoals } = useFoodStore();
    const [isEditingGoals, setIsEditingGoals] = useState(false);
    const [calorieGoal, setCalorieGoal] = useState(
        nutritionGoals.calories.toString()
    );
    const [proteinGoal, setProteinGoal] = useState(
        nutritionGoals.protein.toString()
    );
    const [carbsGoal, setCarbsGoal] = useState(nutritionGoals.carbs.toString());
    const [fatGoal, setFatGoal] = useState(nutritionGoals.fat.toString());

    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const handleSaveGoals = () => {
        updateNutritionGoals({
            calories: parseInt(calorieGoal) || 2000,
            protein: parseInt(proteinGoal) || 150,
            carbs: parseInt(carbsGoal) || 200,
            fat: parseInt(fatGoal) || 65,
        });
        setIsEditingGoals(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
            >
                <View style={styles.profileHeader}>
                    <View style={styles.profileImagePlaceholder}>
                        <User size={40} color={colors.primary} />
                    </View>
                    <Text style={styles.profileName}>User Profile</Text>
                    <Text style={styles.profileSubtitle}>
                        Manage your nutrition goals
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nutrition Goals</Text>

                    {isEditingGoals ? (
                        <View style={styles.goalsEditContainer}>
                            <View style={styles.inputRow}>
                                <Text style={styles.inputLabel}>Calories</Text>
                                <TextInput
                                    style={styles.input}
                                    value={calorieGoal}
                                    onChangeText={setCalorieGoal}
                                    keyboardType="numeric"
                                    placeholder="e.g. 2000"
                                />
                            </View>

                            <View style={styles.inputRow}>
                                <Text style={styles.inputLabel}>
                                    Protein (g)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={proteinGoal}
                                    onChangeText={setProteinGoal}
                                    keyboardType="numeric"
                                    placeholder="e.g. 150"
                                />
                            </View>

                            <View style={styles.inputRow}>
                                <Text style={styles.inputLabel}>Carbs (g)</Text>
                                <TextInput
                                    style={styles.input}
                                    value={carbsGoal}
                                    onChangeText={setCarbsGoal}
                                    keyboardType="numeric"
                                    placeholder="e.g. 200"
                                />
                            </View>

                            <View style={styles.inputRow}>
                                <Text style={styles.inputLabel}>Fat (g)</Text>
                                <TextInput
                                    style={styles.input}
                                    value={fatGoal}
                                    onChangeText={setFatGoal}
                                    keyboardType="numeric"
                                    placeholder="e.g. 65"
                                />
                            </View>

                            <View style={styles.buttonRow}>
                                <Pressable
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => setIsEditingGoals(false)}
                                >
                                    <Text style={styles.cancelButtonText}>
                                        Cancel
                                    </Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.saveButton]}
                                    onPress={handleSaveGoals}
                                >
                                    <Text style={styles.saveButtonText}>
                                        Save
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.goalsContainer}>
                            <View style={styles.goalRow}>
                                <Text style={styles.goalLabel}>Calories</Text>
                                <Text style={styles.goalValue}>
                                    {nutritionGoals.calories}
                                </Text>
                            </View>

                            <View style={styles.goalRow}>
                                <Text style={styles.goalLabel}>Protein</Text>
                                <Text style={styles.goalValue}>
                                    {nutritionGoals.protein}g
                                </Text>
                            </View>

                            <View style={styles.goalRow}>
                                <Text style={styles.goalLabel}>Carbs</Text>
                                <Text style={styles.goalValue}>
                                    {nutritionGoals.carbs}g
                                </Text>
                            </View>

                            <View style={styles.goalRow}>
                                <Text style={styles.goalLabel}>Fat</Text>
                                <Text style={styles.goalValue}>
                                    {nutritionGoals.fat}g
                                </Text>
                            </View>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.editButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={() => setIsEditingGoals(true)}
                            >
                                <Text style={styles.editButtonText}>
                                    Edit Goals
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings</Text>

                    <View style={styles.settingRow}>
                        <View style={styles.settingIconContainer}>
                            <Moon size={20} color={colors.primary} />
                        </View>
                        <Text style={styles.settingLabel}>Dark Mode</Text>
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{
                                false: colors.border,
                                true: colors.primary,
                            }}
                            thumbColor={colors.card}
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <View style={styles.settingIconContainer}>
                            <Bell size={20} color={colors.primary} />
                        </View>
                        <Text style={styles.settingLabel}>Notifications</Text>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            trackColor={{
                                false: colors.border,
                                true: colors.primary,
                            }}
                            thumbColor={colors.card}
                        />
                    </View>

                    <Pressable style={styles.settingRow}>
                        <View style={styles.settingIconContainer}>
                            <Info size={20} color={colors.primary} />
                        </View>
                        <Text style={styles.settingLabel}>About</Text>
                        <ChevronRight size={20} color={colors.textLight} />
                    </Pressable>
                </View>
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
    profileHeader: {
        alignItems: "center",
        marginBottom: 24,
    },
    profileImagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    profileName: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 4,
    },
    profileSubtitle: {
        fontSize: 16,
        color: colors.textLight,
    },
    section: {
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 16,
    },
    goalsContainer: {
        marginBottom: 8,
    },
    goalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    goalLabel: {
        fontSize: 16,
        color: colors.text,
    },
    goalValue: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.primary,
    },
    editButton: {
        backgroundColor: colors.background,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 16,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.primary,
    },
    goalsEditContainer: {
        marginBottom: 8,
    },
    inputRow: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.background,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: colors.text,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    button: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: colors.background,
        marginRight: 8,
    },
    saveButton: {
        backgroundColor: colors.primary,
        marginLeft: 8,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.text,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
    },
    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    settingIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    settingLabel: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },
});

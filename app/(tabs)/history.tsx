import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    SafeAreaView,
} from "react-native";
import { colors } from "@/constants/colors";
import { useFoodStore } from "@/store/food-store";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function HistoryScreen() {
    const router = useRouter();
    const { dailyLogs } = useFoodStore();

    // Convert dailyLogs object to array and sort by date (newest first)
    const logEntries = Object.values(dailyLogs).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    const navigateToDate = (date: string) => {
        // In a real app, this would navigate to a detailed view for this date
        console.log(`Navigate to date: ${date}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Nutrition History</Text>

                {logEntries.length > 0 ? (
                    <FlatList
                        data={logEntries}
                        keyExtractor={(item) => item.date}
                        renderItem={({ item }) => (
                            <Pressable
                                style={({ pressed }) => [
                                    styles.logItem,
                                    pressed && styles.logItemPressed,
                                ]}
                                onPress={() => navigateToDate(item.date)}
                            >
                                <View>
                                    <Text style={styles.dateText}>
                                        {formatDate(item.date)}
                                    </Text>
                                    <Text style={styles.calorieText}>
                                        {item.totalCalories.toFixed(0)} calories
                                    </Text>
                                    <View style={styles.macrosRow}>
                                        <Text style={styles.macroText}>
                                            P: {item.totalProtein.toFixed(0)}g
                                        </Text>
                                        <Text style={styles.macroText}>
                                            C: {item.totalCarbs.toFixed(0)}g
                                        </Text>
                                        <Text style={styles.macroText}>
                                            F: {item.totalFat.toFixed(0)}g
                                        </Text>
                                    </View>
                                </View>
                                <ChevronRight
                                    size={20}
                                    color={colors.textLight}
                                />
                            </Pressable>
                        )}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No history yet</Text>
                        <Text style={styles.emptySubtext}>
                            Start tracking your meals to see your nutrition
                            history
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 20,
    },
    logItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    logItemPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    dateText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 4,
    },
    calorieText: {
        fontSize: 15,
        fontWeight: "500",
        color: colors.primary,
        marginBottom: 4,
    },
    macrosRow: {
        flexDirection: "row",
        gap: 12,
    },
    macroText: {
        fontSize: 14,
        color: colors.textLight,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 8,
        textAlign: "center",
    },
    emptySubtext: {
        fontSize: 16,
        color: colors.textLight,
        textAlign: "center",
    },
});

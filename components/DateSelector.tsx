import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "@/constants/colors";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

interface DateSelectorProps {
    date: Date;
    onDateChange: (date: Date) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
    date,
    onDateChange,
}) => {
    const formatDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dateToCheck = new Date(date);
        dateToCheck.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (dateToCheck.getTime() === today.getTime()) {
            return "Today";
        } else if (dateToCheck.getTime() === yesterday.getTime()) {
            return "Yesterday";
        } else if (dateToCheck.getTime() === tomorrow.getTime()) {
            return "Tomorrow";
        } else {
            return date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
            });
        }
    };

    const goToPreviousDay = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 1);
        onDateChange(newDate);
    };

    const goToNextDay = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        onDateChange(newDate);
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.arrowButton,
                    pressed && styles.buttonPressed,
                ]}
                onPress={goToPreviousDay}
            >
                <ChevronLeft size={24} color={colors.text} />
            </Pressable>

            <Text style={styles.dateText}>{formatDate(date)}</Text>

            <Pressable
                style={({ pressed }) => [
                    styles.arrowButton,
                    pressed && styles.buttonPressed,
                ]}
                onPress={goToNextDay}
            >
                <ChevronRight size={24} color={colors.text} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    dateText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.text,
    },
    arrowButton: {
        padding: 8,
        borderRadius: 20,
    },
    buttonPressed: {
        opacity: 0.7,
        backgroundColor: colors.border,
    },
});

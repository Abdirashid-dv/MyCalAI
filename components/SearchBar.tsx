import React from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { colors } from "@/constants/colors";
import { Search, X } from "lucide-react-native";

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    placeholder = "Search foods...",
}) => {
    return (
        <View style={styles.container}>
            <Search size={20} color={colors.textLight} style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textLight}
            />
            {value.length > 0 && (
                <Pressable
                    onPress={() => onChangeText("")}
                    style={({ pressed }) => [
                        styles.clearButton,
                        pressed && styles.clearButtonPressed,
                    ]}
                >
                    <X size={18} color={colors.textLight} />
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
        height: 50,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
        height: "100%",
    },
    clearButton: {
        padding: 6,
    },
    clearButtonPressed: {
        opacity: 0.7,
    },
});

import React, { useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { useFoodStore } from "@/store/food-store";
import { FoodCard } from "@/components/FoodCard";
import { SearchBar } from "@/components/SearchBar";
import { AddFoodModal } from "@/components/AddFoodModal";
import { Food, MealType } from "@/types/food";

export default function FoodSearchScreen() {
    const router = useRouter();
    const { mealType } = useLocalSearchParams<{ mealType: MealType }>();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFood, setSelectedFood] = useState<Food | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const { searchFoods } = useFoodStore();
    const filteredFoods = searchFoods(searchQuery);

    const handleFoodPress = (food: Food) => {
        setSelectedFood(food);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedFood(null);
    };

    const handleModalClose = () => {
        closeModal();
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    title: `Add to ${mealType || "meal"}`,
                    headerTitleStyle: {
                        color: colors.text,
                        fontWeight: "600",
                    },
                    headerStyle: {
                        backgroundColor: colors.card,
                    },
                }}
            />

            <View style={styles.content}>
                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search foods..."
                />

                {filteredFoods.length > 0 ? (
                    <FlatList
                        data={filteredFoods}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <FoodCard food={item} onPress={handleFoodPress} />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No foods found</Text>
                    </View>
                )}
            </View>

            <AddFoodModal
                visible={modalVisible}
                food={selectedFood}
                mealType={mealType || "snack"}
                onClose={handleModalClose}
            />
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
    listContent: {
        paddingBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: colors.textLight,
        textAlign: "center",
    },
});

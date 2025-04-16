import React, { useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Text } from "react-native";
import { colors } from "@/constants/colors";
import { useFoodStore } from "@/store/food-store";
import { FoodCard } from "@/components/FoodCard";
import { SearchBar } from "@/components/SearchBar";
import { AddFoodModal } from "@/components/AddFoodModal";
import { Food } from "@/types/food";

export default function FoodListScreen() {
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

    return (
        <SafeAreaView style={styles.container}>
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
                mealType="snack"
                onClose={closeModal}
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

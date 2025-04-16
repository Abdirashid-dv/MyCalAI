import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    DailyLog,
    Food,
    MealEntry,
    MealType,
    NutritionGoals,
} from "@/types/food";
import { foods } from "@/mocks/foods";

interface FoodState {
    foods: Food[];
    mealEntries: MealEntry[];
    dailyLogs: Record<string, DailyLog>;
    nutritionGoals: NutritionGoals;

    // Actions
    addMealEntry: (entry: Omit<MealEntry, "id" | "timestamp">) => void;
    removeMealEntry: (entryId: string) => void;
    updateNutritionGoals: (goals: Partial<NutritionGoals>) => void;
    addFood: (food: Omit<Food, "id">) => void;

    // Selectors
    getDailyLog: (date: string) => DailyLog;
    getTodayLog: () => DailyLog;
    getFood: (id: string) => Food | undefined;
    searchFoods: (query: string) => Food[];
}

// Helper to get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
};

// Helper to create an empty daily log
const createEmptyDailyLog = (date: string): DailyLog => ({
    date,
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    meals: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
    },
});

// Create the store
export const useFoodStore = create<FoodState>()(
    persist(
        (set, get) => ({
            foods: foods,
            mealEntries: [],
            dailyLogs: {},
            nutritionGoals: {
                calories: 2000,
                protein: 150,
                carbs: 200,
                fat: 65,
            },

            addMealEntry: (entry) => {
                const food = get().foods.find((f) => f.id === entry.foodId);
                if (!food) return;

                const newEntry: MealEntry = {
                    ...entry,
                    id: Math.random().toString(36).substring(2, 9),
                    timestamp: Date.now(),
                };

                // Update meal entries
                set((state) => ({
                    mealEntries: [...state.mealEntries, newEntry],
                }));

                // Update daily log
                const { date, mealType, quantity } = newEntry;
                const dailyLogs = { ...get().dailyLogs };
                const log = dailyLogs[date] || createEmptyDailyLog(date);

                // Add entry to the appropriate meal
                log.meals[mealType] = [...log.meals[mealType], newEntry];

                // Update nutrition totals
                log.totalCalories += food.calories * quantity;
                log.totalProtein += food.protein * quantity;
                log.totalCarbs += food.carbs * quantity;
                log.totalFat += food.fat * quantity;

                dailyLogs[date] = log;
                set({ dailyLogs });
            },

            removeMealEntry: (entryId) => {
                const entry = get().mealEntries.find((e) => e.id === entryId);
                if (!entry) return;

                const food = get().foods.find((f) => f.id === entry.foodId);
                if (!food) return;

                // Remove from meal entries
                set((state) => ({
                    mealEntries: state.mealEntries.filter(
                        (e) => e.id !== entryId
                    ),
                }));

                // Update daily log
                const { date, mealType, quantity } = entry;
                const dailyLogs = { ...get().dailyLogs };
                const log = dailyLogs[date];
                if (!log) return;

                // Remove entry from the appropriate meal
                log.meals[mealType] = log.meals[mealType].filter(
                    (e) => e.id !== entryId
                );

                // Update nutrition totals
                log.totalCalories -= food.calories * quantity;
                log.totalProtein -= food.protein * quantity;
                log.totalCarbs -= food.carbs * quantity;
                log.totalFat -= food.fat * quantity;

                dailyLogs[date] = log;
                set({ dailyLogs });
            },

            updateNutritionGoals: (goals) => {
                set((state) => ({
                    nutritionGoals: { ...state.nutritionGoals, ...goals },
                }));
            },

            addFood: (food) => {
                const newFood: Food = {
                    ...food,
                    id: Math.random().toString(36).substring(2, 9),
                };

                set((state) => ({
                    foods: [...state.foods, newFood],
                }));
            },

            getDailyLog: (date) => {
                const log = get().dailyLogs[date];
                return log || createEmptyDailyLog(date);
            },

            getTodayLog: () => {
                const today = getTodayDateString();
                return get().getDailyLog(today);
            },

            getFood: (id) => {
                return get().foods.find((food) => food.id === id);
            },

            searchFoods: (query) => {
                const searchTerm = query.toLowerCase().trim();
                if (!searchTerm) return get().foods;

                return get().foods.filter(
                    (food) =>
                        food.name.toLowerCase().includes(searchTerm) ||
                        food.category.toLowerCase().includes(searchTerm)
                );
            },
        }),
        {
            name: "food-storage",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                mealEntries: state.mealEntries,
                dailyLogs: state.dailyLogs,
                nutritionGoals: state.nutritionGoals,
                // Don't persist the foods array since we have it in mocks
            }),
        }
    )
);

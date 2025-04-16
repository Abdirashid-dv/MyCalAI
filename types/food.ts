export interface Food {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    servingSize: string;
    image?: string;
    category: FoodCategory;
}

export type FoodCategory =
    | "fruits"
    | "vegetables"
    | "grains"
    | "protein"
    | "dairy"
    | "snacks"
    | "beverages"
    | "other";

export interface MealEntry {
    id: string;
    foodId: string;
    date: string; // ISO string
    mealType: MealType;
    quantity: number;
    timestamp: number;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface DailyLog {
    date: string; // ISO string format YYYY-MM-DD
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    meals: {
        breakfast: MealEntry[];
        lunch: MealEntry[];
        dinner: MealEntry[];
        snack: MealEntry[];
    };
}

export interface NutritionGoals {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

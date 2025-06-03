-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mealReminders" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weeklyReports" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "workoutReminders" BOOLEAN NOT NULL DEFAULT false;

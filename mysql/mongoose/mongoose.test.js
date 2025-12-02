import mongoose from "mongoose";

const databaseURL = `mongodb://127.0.0.1/mongoose_database`;

// 1. connect mongoose
try {
    await mongoose.connect(databaseURL);
    mongoose.set("debug", true);
} catch (error) {
    console.error(error);
    process.exit();
}

// 2. create schema
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, required: true, min: 5 },
    },
    {
        timestamps: true,
    }
);

// Mongoose Middleware
userSchema.pre("updateOne", async function () {
    this.set({ updatedAt: Date.now() });
});

// 3. creating a model
export const User = mongoose.model("User", userSchema);

// await User.create({ name: "Retesh", age: 24, email: "retesh.sharma@gmail.com"});

await User.updateOne(
    {
        email: "retesh.sharma@gmail.com",
    },
    { $set: { age: 33 } }
);

await mongoose.connection.close();

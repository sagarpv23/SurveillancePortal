"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PlusCircle, Loader2 } from "lucide-react";

export default function CaseForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        license_plate: "",
        lat: "",
        lng: "",
        radius: "1000", // Default 1km
        description: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "cases"), {
                license_plate: formData.license_plate.toUpperCase(),
                geofence: {
                    lat: parseFloat(formData.lat),
                    lng: parseFloat(formData.lng),
                    radius: parseFloat(formData.radius),
                },
                description: formData.description,
                status: "active",
                created_at: serverTimestamp(),
            });

            // Reset form
            setFormData({
                license_plate: "",
                lat: "",
                lng: "",
                radius: "1000",
                description: "",
            });
            alert("Case added successfully!");
        } catch (error) {
            console.error("Error adding case: ", error);
            alert("Error adding case. Check console.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Add New Case
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">License Plate</label>
                    <input
                        type="text"
                        name="license_plate"
                        required
                        value={formData.license_plate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        placeholder="ABC-1234"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Latitude</label>
                        <input
                            type="number"
                            step="any"
                            name="lat"
                            required
                            value={formData.lat}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            placeholder="12.3456"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Longitude</label>
                        <input
                            type="number"
                            step="any"
                            name="lng"
                            required
                            value={formData.lng}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            placeholder="78.9012"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Radius (meters)</label>
                    <input
                        type="number"
                        name="radius"
                        required
                        value={formData.radius}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        rows={3}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Case"}
                </button>
            </form>
        </div>
    );
}

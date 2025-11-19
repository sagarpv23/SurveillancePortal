"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AlertTriangle, MapPin, Clock } from "lucide-react";

interface Detection {
    id: string;
    license_plate: string;
    location: {
        lat: number;
        lng: number;
    };
    image_data: string;
    timestamp: any;
}

export default function DetectionFeed() {
    const [detections, setDetections] = useState<Detection[]>([]);

    useEffect(() => {
        const q = query(
            collection(db, "detections"),
            orderBy("timestamp", "desc"),
            limit(20)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newDetections = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Detection[];
            setDetections(newDetections);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Live Detections
            </h2>
            <div className="space-y-4 overflow-y-auto max-h-[600px]">
                {detections.length === 0 ? (
                    <p className="text-gray-500 text-center">No detections yet.</p>
                ) : (
                    detections.map((detection) => (
                        <div key={detection.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-lg">{detection.license_plate}</span>
                                <span className="text-xs text-gray-500">
                                    {detection.timestamp?.toDate().toLocaleString()}
                                </span>
                            </div>

                            {detection.image_data && (
                                <div className="mb-2 rounded-md overflow-hidden bg-gray-100">
                                    <img
                                        src={detection.image_data}
                                        alt={`Detection ${detection.license_plate}`}
                                        className="w-full h-auto object-cover max-h-40"
                                    />
                                </div>
                            )}

                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>
                                    {detection.location.lat.toFixed(4)}, {detection.location.lng.toFixed(4)}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { license_plate, location, image_data, case_id } = body;

        if (!license_plate || !location || !image_data) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const docRef = await addDoc(collection(db, "detections"), {
            case_id: case_id || "unknown",
            license_plate,
            location,
            image_data,
            timestamp: serverTimestamp(),
        });

        return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
    } catch (error) {
        console.error("Error saving detection:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

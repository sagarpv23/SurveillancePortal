import { NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Helper to calculate distance between two points in meters (Haversine formula)
function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000; // Radius of the earth in m
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in m
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const latParam = searchParams.get("lat");
    const lngParam = searchParams.get("lng");

    if (!latParam || !lngParam) {
        return NextResponse.json(
            { error: "Missing lat or lng query parameters" },
            { status: 400 }
        );
    }

    const userLat = parseFloat(latParam);
    const userLng = parseFloat(lngParam);

    if (isNaN(userLat) || isNaN(userLng)) {
        return NextResponse.json(
            { error: "Invalid lat or lng parameters" },
            { status: 400 }
        );
    }

    try {
        // Fetch all active cases
        // Note: In a real production app with millions of cases, you'd use GeoFire or similar.
        // For a hackathon/MVP, fetching all active cases and filtering in memory is acceptable.
        const q = query(collection(db, "cases"), where("status", "==", "active"));
        const querySnapshot = await getDocs(q);

        const cases = querySnapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            .filter((c: any) => {
                // Filter by geofence
                if (!c.geofence) return false;
                const distance = getDistanceFromLatLonInM(
                    userLat,
                    userLng,
                    c.geofence.lat,
                    c.geofence.lng
                );
                return distance <= c.geofence.radius;
            });

        return NextResponse.json({ cases });
    } catch (error) {
        console.error("Error fetching cases:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
